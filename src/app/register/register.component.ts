import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService) {
    this.title = "Register"
    this.user = new User("", "", "", "", "", "", "ROLE_USER", "");

  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._authService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'succes';
          form.reset();
          this._router.navigate(['/login']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );

  }

}
