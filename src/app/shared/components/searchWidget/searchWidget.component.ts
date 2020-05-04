import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'search-widget',
    templateUrl: './searchWidget.component.html'
})
export class SearchWidgetComponent implements OnInit {
    constructor(private route: ActivatedRoute) {

    }

    search: string = this.route.snapshot.queryParamMap.get('search')

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.search = params.get("search")
        });
    }

    GoClick = () => {
        let url = window.location.href = window.location.origin + window.location.pathname + '#1';
        
        if(this.search.length > 0){
            url +='?search=' + this.search
        }

        window.location.href = url

        window.location.reload();
    }
}
