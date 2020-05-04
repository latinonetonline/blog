import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/services/blogServices';
import { Page } from 'src/app/shared/models/Page';
import { Post } from 'src/app/shared/models/Post';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private titleService: Title, private route: ActivatedRoute, private blogService: BlogService) 
    { 
        this.titleService.setTitle(`Latino .NET Online Blog`);
    }

    page: Page
    posts: Post[] = []
    nroPage: number = 1
    isLoading: boolean = true;

    ngOnInit() {
        let routeNroPage = this.route.snapshot.paramMap.get('page');
        let routeSearch = this.route.snapshot.queryParamMap.get('search');

        if (routeNroPage && parseInt(routeNroPage) > 0) {
            this.nroPage = parseInt(routeNroPage)
        }

        this.blogService.getPage(this.nroPage, routeSearch).subscribe((data: Page) => {
            this.page = data;

            for (let index = 0; index < this.page.slugs.length; index++) {
                const slug = this.page.slugs[index]

                this.blogService.getPost(slug).subscribe((post: Post) => {
                    this.posts.push(post)
                })
            }
            this.isLoading = false;
        })
    }

    getSortedPosts = () => this.posts.sort((a, b) => (a.Date < b.Date) ? 1 : ((b.Date < a.Date) ? -1 : 0))

    getPaginationNumbers = () => {
        if (this.page.totalPages == 1)
            return [1];

        if (this.page.totalPages < 3)
            return [1, 2];

        if (this.nroPage == 1 || this.nroPage == 2)
            return [1, 2, 3];

        if (this.nroPage == this.page.totalPages || this.nroPage == this.page.totalPages - 1)
            return [this.page.totalPages - 2, this.page.totalPages - 1, this.page.totalPages];

        return [this.nroPage - 1, this.nroPage, this.nroPage + 1];
    }

    getHostname(): string {
        return window.location.origin;
    }

    onChangePage = (nroPage: number) => {

        let url = window.location.origin + window.location.pathname + '#' + nroPage
        
        if (this.route.snapshot.queryParamMap.has('search')) {
            url += `?search=${this.route.snapshot.queryParamMap.get('search')}`;
        }
        window.location.href = url;

        window.location.reload();
    }
}
