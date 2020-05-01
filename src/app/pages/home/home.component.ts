import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/services/blogServices';
import { Page } from 'src/app/shared/models/Page';
import { Post } from 'src/app/shared/models/Post';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private route: ActivatedRoute, private blogService: BlogService) { }

    page: Page
    posts: Post[] = []
    nroPage: number = 1
    isLoading: boolean = true;

    ngOnInit() {
        let routeNroPage = this.route.snapshot.paramMap.get('page');

        if (routeNroPage && parseInt(routeNroPage) > 0) {
            this.nroPage = parseInt(routeNroPage)
        }

        this.blogService.getPage(this.nroPage).subscribe((data: Page) => {
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
            return [1, 2];

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
        window.location.href = window.location.origin + window.location.pathname + '#' + nroPage
        window.location.reload();
    }
}
