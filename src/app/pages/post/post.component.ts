import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BlogService } from 'src/services/blogServices';
import { Post } from 'src/app/shared/models/Post';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class PostComponent implements OnInit {
    constructor(private route: ActivatedRoute, private blogService: BlogService, private sanitizer: DomSanitizer, private datepipe: DatePipe
    ) { }

    private slug: string;
    isLoading: boolean = true;
    post: Post;
    htmlBody: SafeHtml;
    fullDate: string;

    ngOnInit() {
        this.slug = encodeURI(this.route.snapshot.paramMap.get('id').toLowerCase());

        this.blogService.getPost(this.slug).subscribe((data: Post) => {
            this.post = data;
            this.htmlBody = this.sanitizer.bypassSecurityTrustHtml(this.post.Html);
            let day = this.datepipe.transform(this.post.Date, 'EEEE', 'UTC');
            let daynro = this.datepipe.transform(this.post.Date, 'd', 'UTC');
            let month = this.datepipe.transform(this.post.Date, 'MMMM', 'UTC');
            let year = this.datepipe.transform(this.post.Date, 'y', 'UTC');
            this.fullDate = `${this.MaysPrimera(day)} ${daynro} de ${this.MaysPrimera(month)} ${year}`
            this.isLoading = false;
        })
    }

    private MaysPrimera(string: string){
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
}
