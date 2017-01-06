import {Micropost} from './micropost';

describe('Micropost', () => {
  it('should create an instance', () => {
    expect(new Micropost()).toBeTruthy();
  });

  it('should take constructor arguments', () => {
    let micropost = new Micropost('body', '1');
    expect(micropost.body).toEqual('body');
    expect(micropost.userId).toEqual('1');
  });
});
