import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserDataService {
  users: User[] = [];

  private lastId = 0;

  constructor() { }

  findAll(): Promise<User[]> {
    return new Promise(resolve => {
      resolve(this.users);
    })
    .catch(this.errorHandler);
  }
  findById(id: number): Promise<User> {
    return new Promise(resolve => {
      let user = this.users.find((u: User): boolean => u.id === id);
      resolve(user || null);
    })
    .catch(this.errorHandler);
  }
  add(user: User): Promise<User> {
    return new Promise(resolve => {
      if (!user.id) { user.id = ++this.lastId; }
      this.users.push(user);
      resolve(user);
    })
    .catch(this.errorHandler);
  }
  deleteById(id: number): Promise<User> {
    return new Promise(resolve => {
      this.users = this.users.filter((u: User): boolean => u.id !== id);
      resolve();
    })
    .catch(this.errorHandler);
  }
  updateById(id: number, updates: any): Promise<User> {
    return new Promise(resolve => {
      this.findById(id)
        .then(user => {
          let result = user ? Object.assign(user, updates) : null;
          resolve(result);
        });
    })
    .catch(this.errorHandler);
  }
  errorHandler(err: any): void {
    console.error(err);
  }

}
