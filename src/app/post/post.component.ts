import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GLOBAL } from '../global';
import { PostingService } from '../posting.service';
import * as moment from 'moment';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

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
  @Input() user: string;
  public noMore = false;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _postingService: PostingService
  ) {
    this.title = 'Posts';
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }

  ngOnInit(): void {
    this.getPosts(this.user, this.page);
  }

  getPosts(user, page, adding = false) {
    this._postingService.getPostUser(this.token, this.user, page).subscribe(
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
            $("html, body").animate({ scrollTop: $('html').prop("scrollHeight") }, 500);
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
    this.getPosts(this.user, this.page, true);
  }

}
