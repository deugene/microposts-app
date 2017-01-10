export class Relationship {
  constructor (
    public followerId?: string,
    public followedId?: string,
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string
  ) { }
}
