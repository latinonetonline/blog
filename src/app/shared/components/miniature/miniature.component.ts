import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post';

@Component({
    selector: 'miniature',
    templateUrl: './miniature.component.html'
})
export class MiniatureComponent implements OnInit {
    constructor() { }

    @Input()
    post: Post;

    ngOnInit() {
    }

    getPostLink = () => "#posts/" + this.post.Slug
}
