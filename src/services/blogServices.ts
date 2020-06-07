import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/Post';
import { Page } from 'src/app/shared/models/Page';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    constructor(private httpClient: HttpClient) { }

    public getPost(slug: string) {
        return this.httpClient.get<Post>(`https://raw.githubusercontent.com/latinonetonline/blogdb/master/article/${slug}`);
    }

    public getPage(nroPage: number, search: string) {
        let url = `https://blog.latinonetonline.workers.dev/articles?page=${nroPage}&recPerPage=3`;

        if (search && search.length > 0) {
            url += `&search=${search}`;
        }
        
        return this.httpClient.get<Page>(url);
    }
}