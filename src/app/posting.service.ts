import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PostingService {

  public url: string;


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addPost(token, post): Observable<any> {
    let params = JSON.stringify(post);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'post', params, { headers: headers });
  }

  getPost(token, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'posts/' + page, { headers: headers });
  }

  getPostUser(token, user_id, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'posts-user/' + user_id + '/' + page, { headers: headers });
  }

  deletePost(token, id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'post/' + id, { headers: headers });
  }

}
