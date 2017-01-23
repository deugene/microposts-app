import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { User } from './user';
import { Micropost } from './micropost';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

export interface PaginationResult {
  count: number;
  data: User[] & Micropost[];
}

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private authHttp: AuthHttp
  ) { }

  all(paginationOpts: any): Promise<PaginationResult> {
    return this.authHttp
      .post(
        'api/users/all',
        JSON.stringify(paginationOpts),
        { headers: this.headers }
      )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw result.err; }
        return result as PaginationResult;
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
          throw result.err;
        } else if (result.err && result.err.message === 'User Not Found') {
          result.data = null;
        }
        return result.data as User;
      })
      .catch(this.errorHandler);
  }
  create(user: User): Promise<User> {
    return this.authHttp
      .post(`api/users`, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw result.err; }
        return result.data as User;
      })
      .catch(this.errorHandler);
  }
  destroy(id: string): Promise<User> {
    return this.authHttp
      .delete(`api/users/${id}`)
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw result.err; }
        return result.data as User;
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
        if (result.err) { throw result.err; }
        return result.data as User;
      })
      .catch(this.errorHandler);
  }
  feed(id: string, paginationOpts: any): Promise<PaginationResult> {
    return this.authHttp
      .post(
        `api/users/${id}/feed`,
        JSON.stringify(paginationOpts),
        { headers: this.headers }
      )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw result.err; }
        return result as PaginationResult;
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
        if (result.err) { throw result.err; }
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
          throw result.err;
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
