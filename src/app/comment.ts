export class Comment {
  constructor (
    public body?: string,
    public userId?: string,
    public micropostId?: number,
    public id?: number,
    public createdAt?: string,
    public updatedAt?: string
  ) { }
}
