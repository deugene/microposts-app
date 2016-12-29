import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './static-pages/about/about.component';
import { HomeComponent } from './static-pages/home/home.component';

import { UserDataService } from './user-data.service';
import { AuthService } from './auth.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { UsersComponent } from './users/users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserOverviewComponent } from './users/user-overview/user-overview.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    UsersComponent,
    UserEditComponent,
    UserOverviewComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    UserDataService,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
