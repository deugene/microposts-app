import { Micropost } from './micropost';

export class User {
  constructor(
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public id?: string,
    public admin = false,
    public createdAt?: string,
    public updatedAt?: string,
    public microposts?: Micropost[],
    public followers?: User[],
    public followedUsers?: User[]
  ) { }
}
