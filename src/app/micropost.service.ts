import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Micropost } from './micropost';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MicropostService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) { }

  create(micropost: Micropost): Promise<Micropost> {
  return this.authHttp
    .post(
      `api/microposts`,
      JSON.stringify(micropost),
      { headers: this.headers }
    )
    .toPromise()
    .then(res => {
      let result = res.json();
      if (result.err) { throw result.err; }
      return result.data as Micropost;
    })
    .catch(this.errorHandler);
  }
  destroy(id: number): Promise<Micropost> {
    return this.authHttp
      .delete(`api/microposts/${id}`)
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw result.err; }
        return null;
      })
      .catch(this.errorHandler);
  }
  update(id: number, updates: any): Promise<Micropost> {
    return this.authHttp
      .put(
        `api/microposts/${id}`,
        JSON.stringify(updates),
        { headers: this.headers }
      )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw result.err; }
        return result.data as Micropost;
      })
      .catch(this.errorHandler);
  }
  errorHandler(err: any): void {
    console.error(err);
  }
}
