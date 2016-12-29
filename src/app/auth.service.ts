import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

declare const Auth0: any;

@Injectable()
export class AuthService {
  auth0 = new Auth0({
    domain: 'deugene.eu.auth0.com',
    clientID: 'ZLSeG1Tw3JdKCPLw6XrOFSiJ000e2me5',
    responseType: 'token',
    callbackURL: 'http://localhost:4200/'
  });

  private idToken: string;
  userProfile: Object;

  constructor(private router: Router) {
    let result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.idToken = result.idToken;
      this.getUserProfile();
      this.router.navigate([ '' ]);
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
    localStorage.removeItem('id_token');
    this.router.navigate([ '/home' ]);
  }

  getUserProfile(): Promise<Object> {
    return new Promise((res, rej) => {
      if (this.userProfile) {
        res(this.userProfile);
        return;
      }
      this.auth0.getProfile(this.idToken, (err, profile): void => {
        if (err) {
          rej(err);
          return;
        }
        this.userProfile = profile;
        res(profile);
      });
    });
  }
}
