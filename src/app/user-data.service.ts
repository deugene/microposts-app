import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserDataService {
  users: User[] = [
    new User('admin@admin.com', 'admin', 'admin', undefined, true, 1),
    new User('2@e.com', 'Tobi', 'Ferret', undefined, false, 2),
    new User('3@n.com', 'Loki', 'Ferret', undefined, false, 3)
  ];

  private lastId = 0;

  constructor() { }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
  findById(id: number): Promise<User> {
    let user = this.users.find((u: User): boolean => u.id === id);
    return Promise.resolve(user || null);
  }
  add(user: User): Promise<User> {
    if (!user.id) { user.id = ++this.lastId; }
    this.users.push(user);
    return Promise.resolve(user);
  }
  deleteById(id: number): Promise<User> {
    this.users = this.users.filter((u: User): boolean => u.id !== id);
    return Promise.resolve();
  }
  updateById(id: number, updates: any): Promise<User> {
    let res: User;
    this.findById(id)
      .then(user => {
        let result = user ? Object.assign(user, updates) : null;
        res = result;
      });
    return Promise.resolve(res);
  }
  errorHandler(err: any): void {
    console.error(err);
  }

}
