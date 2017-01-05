import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { User } from './user';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserDataService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) { }

  findAll(): Promise<User[]> {
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
  add(user: User): Promise<User> {
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
  deleteById(id: string): Promise<User> {
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
  updateById(id: string, updates: any): Promise<User> {
    return this.authHttp
      .put(
        `api/users`,
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
  errorHandler(err: any): void {
    console.error(err);
  }

}
