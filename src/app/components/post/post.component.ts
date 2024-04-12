import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post.interface';
import { PostsService } from 'src/app/services/posts.service';
@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
    posts!: Post[];
    minMilliseconds = 1618400000000;
    maxMilliseconds = 1618401000000;

    constructor(private postSrv: PostsService) {}

    ngOnInit() {
        console.log('ngOnInit attivato');
        this.postSrv.getPosts().subscribe((data) => {
            this.posts = data;
            this.filterPosts();
            console.log(this.posts);
        });
    }

    filterPosts() {
        if (!this.posts || this.posts.length === 0) return;

        this.posts.sort((a, b) => {
            return b.id - a.id;

            /*  if (!this.posts || this.posts.length === 0) return; // VERIFICA SE ESISTONO DEI POST, SE NON VI E' NESSUN POST NON PASSA AL BLOCCO SUCCESSIVO!!

        this.posts.sort((a, b) => {
            // l'ordinamento avviene in base al valore restituito dalla funzione. Se il valore restituito è negativo, a viene considerato "prima" di b. Se il valore è positivo, b viene considerato "prima" di a.
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();

            return bDate - aDate;
        });
        console.log('After sorting:', this.posts); */
        });
    }
}
