import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { GLOBAL } from '../global';
import { FollowService } from '../follow.service';
import { Follow } from '../models/follow';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public stats;
  public url: string;
  public followed;
  public following;
  public followUserOver;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _followService: FollowService

  ) {
    this.title = 'Profile';
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    this.url = GLOBAL.url;
    this.followed = false;
    this.following = false;
  }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(
      params => {
        let id = params['id'];
        this.getUser(id);
        this.getCounter(id);
      }
    )
  }

  getUser(id) {
    this._authService.getUser(id).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
          if (response.following && response.following._id) {
            this.following = true;
          } else {
            this.following = false;
          }
          if (response.followed && response.followed._id) {
            this.followed = true;
          } else {
            this.followed = false;
          }
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this._router.navigate(['/profil', this.identity._id]);
      }
    );
  }

  getCounter(id) {
    this._authService.getCounter(id).subscribe(
      response => {
        this.stats = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  followUser(followed) {
    var follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        this.following = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  unfollowUser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        this.following = false;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  mouseEnter(user_id) {
    this.followUserOver = user_id;
  }

  mouseLeave(user_id) {
    this.followUserOver = 0;
  }

}
