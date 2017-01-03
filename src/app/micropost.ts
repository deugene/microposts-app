export class Micropost {
  constructor (
    public title?: string,
    public body?: string,
    public UserId?: number,
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string
  ) { }
}
