export class Micropost {
  constructor (
    public body?: string,
    public userId?: string,
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string,
    public comments?: Comment[]
  ) { }
}
