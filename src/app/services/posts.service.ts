import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Post } from '../interface/post.interface';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    apiURL = environment.apiURL;

    constructor(private http: HttpClient) {}

    getPosts() {
        return this.http.get<Post[]>(`${this.apiURL}posts`);
    }

    newPost(data: Post) {
        const postWithDate: Post = { ...data, date: new Date().toISOString() };
        return this.http.post<Post>(`${this.apiURL}posts`, postWithDate);
    }
}
