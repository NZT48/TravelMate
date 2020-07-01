import { Component, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GLOBAL } from './global';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string;
  public identity;
  public url: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private authService: AuthService
  ) { 
    this.title = 'Travel Mate';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this.authService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this.authService.getIdentity();
  }

  
   logout() {
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/']);
   }

}
