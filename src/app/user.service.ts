import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { User } from './user';
import { Micropost } from './micropost';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private authHttp: AuthHttp
  ) { }

  all(): Promise<User[]> {
    return this.authHttp
      .get('api/users')
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return result as User[];
      })
      .catch(this.errorHandler);
  }
  findById(id: string): Promise<User> {
    return this.authHttp
      .get(`api/users/${id}`)
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err && result.err.message !== 'User Not Found') {
          throw new Error(result.err);
        } else if (result.err && result.err.message === 'User Not Found') {
          result = null;
        }
        return result as User;
      })
      .catch(this.errorHandler);
  }
  create(user: User): Promise<User> {
    return this.authHttp
      .post(`api/users`, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return result as User;
      })
      .catch(this.errorHandler);
  }
  destroy(id: string): Promise<User> {
    return this.authHttp
      .delete(`api/users/${id}`)
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return null;
      })
      .catch(this.errorHandler);
  }
  update(id: string, updates: any): Promise<User> {
    return this.authHttp
      .put(
        `api/users/${id}`,
        JSON.stringify(updates),
        { headers: this.headers }
      )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return result as User;
      })
      .catch(this.errorHandler);
  }
  feed(id: string): Promise<Micropost[]> {
    return this.authHttp
      .get(`api/users/${id}/feed`)
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return result as Micropost[];
      })
      .catch(this.errorHandler);
  }
  fullName(user: User): string {
    return user.firstName + ' ' + user.lastName;
  }
  auth0Update(id: string, update: any): Promise<boolean> {
    return this.authHttp
      .post(
        `api/auth/${id}/update-user-profile`,
        JSON.stringify(update),
        { headers: this.headers }
      )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return true;
      })
      .catch(this.errorHandler);
  }
  changePass(id: string): Promise<any> {
    return this.authHttp
      .post(
        `api/auth/${id}/change-pass`,
        JSON.stringify({ user_id: id }),
        { headers: this.headers }
      )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) {
          throw new Error(result.err.message);
        } else if (!result.ticket) {
          throw new Error('Ticket Not Recieved');
        }
        return result.ticket;
      })
      .catch(this.errorHandler);
  }

  errorHandler(err: any): void {
    console.error(err);
  }

}
