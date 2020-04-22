import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class PostComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
    }
}
