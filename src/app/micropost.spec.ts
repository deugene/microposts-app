import {Micropost} from './micropost';

describe('Micropost', () => {
  it('should create an instance', () => {
    expect(new Micropost()).toBeTruthy();
  });

  it('should take constructor arguments', () => {
    let micropost = new Micropost('title', 'body', 1);
    expect(micropost.title).toEqual('title');
    expect(micropost.body).toEqual('body');
    expect(micropost.UserId).toEqual(1);
  });
});
