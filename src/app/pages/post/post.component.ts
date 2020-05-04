import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BlogService } from 'src/services/blogServices';
import { Post } from 'src/app/shared/models/Post';
import { DomSanitizer, SafeHtml, Meta } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class PostComponent implements OnInit {
    constructor(private metaTagService: Meta, private titleService: Title, private route: ActivatedRoute, private blogService: BlogService, private sanitizer: DomSanitizer, private datepipe: DatePipe
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
            this.metaTagService.addTags([
                { name: 'author', content: `Latino .NET Online & ${this.post.Speaker}` },
                { name: 'description', content: `${this.post.Description}` },
                { name: 'date', content: this.datepipe.transform(this.post.Date, 'y-MM-dd', 'UTC'), scheme: 'YYYY-MM-DD' },

                { name: 'twitter:card', content: `summary_large_image` },
                { name: 'twitter:description', content: `${this.post.Description}` },
                { name: 'twitter:image', content: `${this.post.ImageLink}` },
                { name: 'twitter:title', content: `${this.post.Title} - Latino .NET Online Blog` },
                
                { name: 'og:locale', content: `es_ES` },
                { name: 'og:type', content: `article` },
                { name: 'og:title', content: `${this.post.Title} - Latino .NET Online Blog` },
                { name: 'og:description', content: `${this.post.Description}` },
                { name: 'og:image', content: `${this.post.ImageLink}` },
                { name: 'og:image:secure_url', content: `${this.post.ImageLink}` },
                { name: 'og:image:width', content: `1200` },
                { name: 'og:image:height', content: `628` },
            ]);
            this.titleService.setTitle(`${this.post.Title} - Latino .NET Online Blog`);
            this.htmlBody = this.sanitizer.bypassSecurityTrustHtml(this.post.Html);
            let day = this.datepipe.transform(this.post.Date, 'EEEE', 'UTC');
            let daynro = this.datepipe.transform(this.post.Date, 'd', 'UTC');
            let month = this.datepipe.transform(this.post.Date, 'MMMM', 'UTC');
            let year = this.datepipe.transform(this.post.Date, 'y', 'UTC');
            this.fullDate = `${this.MaysPrimera(day)} ${daynro} de ${this.MaysPrimera(month)} ${year}`
            this.isLoading = false;
        })
    }

    private MaysPrimera(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
