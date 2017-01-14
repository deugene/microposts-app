import { Micropost } from './micropost';

export class User {
  constructor(
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public id?: string,
    public picture?: string,
    public admin = false,
    public createdAt?: string,
    public updatedAt?: string,
    public followers?: User[],
    public followedUsers?: User[]
  ) { }
}
