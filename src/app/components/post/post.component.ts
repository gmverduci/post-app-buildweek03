import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interface/post.interface';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  posts!: Post[];

  constructor(private postSrv: PostsService) {}

  ngOnInit() {
    console.log('ngOnInit attivato');
    this.postSrv.getPosts().subscribe((data) => {
        this.posts = data;
    });
}

}
