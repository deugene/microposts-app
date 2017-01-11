import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Relationship } from './relationship';
import { User } from './user';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RelationshipService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) { }

  isFollow(user: User, otherId: string): boolean {
    return user.followedUsers.some(follower => follower.id === otherId);
  }

  follow(userId: string, otherId: string): Promise<Relationship> {
    const follow = new Relationship(userId, otherId);
    return this.authHttp.post(
      'api/relationships',
      JSON.stringify(follow),
      { headers: this.headers }
    )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return result as Relationship;
      })
      .catch(this.errorHandler);
  }

  unfollow(userId: string, otherId: string): Promise<Relationship> {
    return this.authHttp.delete(
      `api/relationships/${userId}/${otherId}`,
      { headers: this.headers }
    )
      .toPromise()
      .then(res => {
        let result = res.json();
        if (result.err) { throw new Error(result.err.message); }
        return null;
      })
      .catch(this.errorHandler);
  }

  errorHandler(err: any): void {
    console.error(err);
  }
}
