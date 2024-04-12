import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interface/user.interface';
import { Post } from 'src/app/interface/post.interface';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent {
    items: string[] = [];
    users!: User[];

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private postSrv: PostsService,
        private cdr: ChangeDetectorRef,
        private usersSrv: UsersService,
        private notifSrv: NotificationsService
    ) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        console.log('ngOnInit attivato');

        this.usersSrv.getUsers().subscribe((users) => {
            this.users = users;
            this.items = users.map((user) => user.username);
            console.log('items[]: ', this.items);
            this.cdr.detectChanges();
        });
    }

    async processPostContent(
        content: NgForm['value']
    ): Promise<NgForm['value']> {
        const mentionRegex = /@(\w+)/g;
        let processedContent = content;

        let match;
        while ((match = mentionRegex.exec(content)) !== null) {
            const username = match[1];
            const userId = await this.getUserIdByUsername(username);

            if (userId) {
                const link = `<a routerLink="/user/${userId}">@${username}</a>`;
                processedContent = processedContent.replace(
                    `@${username}`,
                    link
                );
            }
        }

        return processedContent;
    }

    extractMentions(content: string): string[] {
        const mentionRegex = /@(\w+)/g;
        let match;
        const mentions = [];
        while ((match = mentionRegex.exec(content)) !== null) {
            mentions.push(match[1]);
        }
        return mentions;
    }

    async getUserIdByUsername(username: string): Promise<number | null> {
        const user = await this.usersSrv
            .getUserByUsername(username)
            .toPromise();
        return user ? user.id : null;
    }

    async getTaggedUsers(mentions: string[]): Promise<User[]> {
        const taggedUsers: User[] = [];
        for (const mention of mentions) {
            const user = await this.usersSrv
                .getUserByUsername(mention)
                .toPromise();
            if (user) {
                taggedUsers.push(user);
            }
        }
        return taggedUsers;
    }

    async notifyTaggedUsers(taggedUsers: User[], newPost: Post): Promise<void> {
        for (const user of taggedUsers) {
            await this.notifSrv.addNotification({
                userId: user.id,
                type: 'mention',
                message: `You were mentioned`, //voglio creare un currentUser - utente loggato - per indicare anche da chi si è menzionati
                postId: newPost.id,
            });
        }
    }

    open(content: any) {
        this.modalService.open(content);
    }

    async save(form: NgForm) {
        const processedContent = await this.processPostContent(form.value);
        const mentions = this.extractMentions(processedContent);
        const taggedUsers = await this.getTaggedUsers(mentions);

        const newPost = this.postSrv.newPost(processedContent).subscribe();

        this.postSrv.newPost(processedContent).subscribe(
            (newPost) => {
                this.notifyTaggedUsers(taggedUsers, newPost)
                    .then(() => {
                        // this.router.navigate(['/']);
                    })
                    .catch((error) => {
                        console.error('Error notifying tagged users:', error);
                    });
            },
            (error) => {
                console.error('Error creating new post:', error);
            }
        );

    }
}

// Immagine nel form nuovo post dev'essere opzionale
// Non mi fa la post delle notifications
// Controllo formattatore mentions
// Vedi notifyTaggedUsers
