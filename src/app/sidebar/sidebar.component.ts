import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GLOBAL } from '../global';
import { PostingService } from '../posting.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public url;
  public identity;
  public token;
  public stats;
  public status;
  public post: Post;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _publicationService: PostingService,
    private _authService: AuthService) {
    this.url = GLOBAL.url;
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
    this.stats = this._authService.getStats();
    this.post = new Post("", "", "", "", this.identity._id);
  }

  ngOnInit(): void {
    this.getCounter(this.identity._id);
  }

  getCounter(id) {
    this._authService.getCounter(id).subscribe(
      response => {
        this.stats = response;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form, event) {
    this._publicationService.addPost(this.token, this.post).subscribe(
      response => {
        if (response.post) {
          this.post = response.post;
          this.status = 'success';
          form.reset();
          this._router.navigate(['/timeline']);
          this.sended.emit({ send: 'true' });
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

  @Output() sended = new EventEmitter();

  sendPublication(event) {
    this.sended.emit({ send: 'true' });
  }
}
