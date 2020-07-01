import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';

import { AuthService } from './auth.service';
import { PostComponent } from './post/post.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FollowedComponent } from './followed/followed.component';
import { FollowingComponent } from './following/following.component';
import { UsersComponent } from './users/users.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent,
    PostComponent,
    SidebarComponent,
    TimelineComponent,
    FollowedComponent,
    FollowingComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MomentModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
