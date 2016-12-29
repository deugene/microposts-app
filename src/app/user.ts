export class User {
  constructor(
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public id?: number,
    public profile?: any,
    public admin = false
  ) { }

  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
