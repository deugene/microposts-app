import { Micropost } from './micropost';

export class User {
  constructor(
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public profile = 'empty',
    public admin = false,
    public id?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public microposts?: Micropost[]
  ) { }
}
