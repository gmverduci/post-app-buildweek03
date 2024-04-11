import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent {
    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private postSrv: PostsService
    ) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
    }

    open(content: any) {
        this.modalService.open(content);
    }

    save(form: NgForm) {
        this.postSrv.newPost(form.value).subscribe();
        // this.router.navigate(['/']);
    }
}
