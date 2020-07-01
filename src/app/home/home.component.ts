import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title: string;
  public identity;

  constructor(private authServ: AuthService) {
    this.title = 'Welcome!';
  }

  ngOnInit(): void {
    this.identity = this.authServ.getIdentity();
  }

}
