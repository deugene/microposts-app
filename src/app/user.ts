import { Micropost } from './micropost';

export class User {
  constructor(
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public profile?: any,
    public admin = false,
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string,
    public microposts?: Micropost[]
  ) { }

  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
