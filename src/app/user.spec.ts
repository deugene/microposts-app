import {User} from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should take constructor arguments', () => {
    let user = new User('1@e.ua', 'Foo', 'Bar', 1);
    expect(user.id).toEqual(1);
    expect(user.email).toEqual('1@e.ua');
    expect(user.firstName).toEqual('Foo');
  });
});
