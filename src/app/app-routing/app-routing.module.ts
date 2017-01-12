import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '../static-pages/about/about.component';
import { HomeComponent } from '../static-pages/home/home.component';
import { UsersComponent } from '../users/users/users.component';
import { UserOverviewComponent } from '../users/user-overview/user-overview.component';
import { UserEditComponent } from '../users/user-edit/user-edit.component';
import { LoginComponent } from '../users/login/login.component';
import { SignupComponent } from '../users/signup/signup.component';

import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuardService ] },
  { path: 'about', component: AboutComponent },
  { path: 'overview/:userId', component: UserOverviewComponent, canActivate: [ AuthGuardService ] },
  { path: 'users/:userId/edit', component: UserEditComponent, canActivate: [ AuthGuardService ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
