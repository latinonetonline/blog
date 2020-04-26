import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/Post';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private httpClient: HttpClient) { }

    public getPost(slug: string) {
        return this.httpClient.get<Post>(`https://raw.githubusercontent.com/latinonetonline/blogdb/master/article/${slug}`);
    }
}