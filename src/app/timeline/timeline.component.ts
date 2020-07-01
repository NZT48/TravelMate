import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Post } from '../models/post';
import { GLOBAL } from '../global';
import { PostingService } from '../posting.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

    public identity;
    public token;
    public title: string;
    public url: string;
    public status: string;
    public page;
    public total;
    public pages;
    public itemsPerPage;
    public posts: Post[];
    public dest: string;
    public noMore = false;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authService: AuthService,
        private _postService: PostingService
    ) {
        this.title = 'Timeline';
        this.identity = this._authService.getIdentity();
        this.token = this._authService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
    }

    ngOnInit(): void {
        this.dest = this._route.snapshot.paramMap.get("dest")
        this.getPosts(this.page);
    }

    getPosts(page, adding = false) {
        this._postService.getPost(this.token, page).subscribe(
            response => {
                if (response.posts) {
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage = response.item_per_page;
                    if (!adding) {
                        this.posts = response.posts;
                    } else {
                        var arrayA = this.posts;
                        var arrayB = response.posts;
                        this.posts = arrayA.concat(arrayB);
                        $("html, body").animate({ scrollTop: $('body').prop("scrollHeight") }, 500);
                    }
                } else {
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    viewMore() {
        this.page += 1;
        if (this.page == this.pages) {
            this.noMore = true;
        }
        this.getPosts(this.page, true);
    }

    refresh(event = null) {
        this.getPosts(1);
    }


    deletePost(id) {
        this._postService.deletePost(this.token, id).subscribe(
            response => {
                this.refresh();
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}
