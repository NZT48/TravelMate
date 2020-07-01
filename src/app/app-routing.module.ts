import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UsersComponent } from './users/users.component';
import { FollowingComponent } from './following/following.component';
import { FollowedComponent } from './followed/followed.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'timeline/:dest', component: TimelineComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:page', component: UsersComponent},
  {path: 'profil/:id', component: ProfilComponent},
  {path: 'following/:id/:page', component: FollowingComponent},
  {path: 'followed/:id/:page', component: FollowedComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
