import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { UserService } from './user.service';
import { User } from './user';

declare const Auth0: any;

@Injectable()
export class AuthService {
  auth0 = new Auth0({
    domain: 'deugene.eu.auth0.com',
    clientID: 'ZLSeG1Tw3JdKCPLw6XrOFSiJ000e2me5',
    responseType: 'token'
  });

  private accessToken: string;
  userProfile: any;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    let result = this.auth0.parseHash(window.location.hash);

    if (result && result.accessToken && result.idToken) {
      localStorage.setItem('access_token', result.accessToken);
      localStorage.setItem('id_token', result.idToken);
      this.accessToken = result.accessToken;
      this.getUserProfile()
        .then(profile => {
          const user_id = profile.user_id;
          this.userService.findById(user_id)
            .then(user => {
              if (!user) {
                const newUser = new User(
                  profile.email,
                  profile.given_name || profile.name,
                  profile.family_name || '',
                  user_id
                );
                this.userService.create(newUser)
                  .then(() => {
                    this.router.navigate([ `users/${user_id}/edit` ]);
                  });
              } else {
                this.router.navigate([ `overview/${user_id}` ]);
              }
            });
        });
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  login(username: string, password: string): void {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password
    }, err => {
      if (err) { alert('error: ' + err.message); }
    });
  }

  signUp(username: string, password: string): void {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password
    }, err => {
      if (err) { alert('error: ' + err.message); }
    });
  }

  googleLogin(): void {
    this.auth0.login({
      connection: 'google-oauth2'
    }, err => {
      if (err) { alert('error: ' + err.message); }
    });
  }

  authenticated(): boolean {
    return tokenNotExpired();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_profile');
    this.router.navigate([ '/home' ]);
  }

  getUserProfile(): Promise<any> {
    return new Promise((res, rej) => {
      const userProfile = JSON.parse(localStorage.getItem('user_profile'));
      if (userProfile) {
        res(userProfile);
        return;
      } else if (this.accessToken) {
        this.auth0.getUserInfo(this.accessToken, (err, profile): void => {
          if (err) {
            rej(err);
            return;
          }
          localStorage.setItem('user_profile', JSON.stringify(profile));
          // this.userProfile = profile;
          res(profile);
        });
      } else {
        res(null);
      }
    });
  }
}
