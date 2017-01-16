import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { Ng2PaginationModule } from 'ng2-pagination';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MicropostService } from './micropost.service';
import { RelationshipService } from './relationship.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './static-pages/about/about.component';
import { HomeComponent } from './static-pages/home/home.component';
import { UsersComponent } from './users/users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserOverviewComponent } from './users/user-overview/user-overview.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';
import { MicropostsComponent } from './microposts/microposts/microposts.component';
import { DialogComponent } from './dialog/dialog.component';
import { FollowersComponent } from './users/followers/followers.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    UsersComponent,
    UserEditComponent,
    UserOverviewComponent,
    LoginComponent,
    SignupComponent,
    MicropostsComponent,
    DialogComponent,
    FollowersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2PaginationModule
  ],
  providers: [
    UserService,
    AuthService,
    MicropostService,
    RelationshipService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
