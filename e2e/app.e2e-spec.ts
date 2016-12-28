import { MicropostsAppPage } from './app.po';

describe('microposts-app App', function() {
  let page: MicropostsAppPage;

  beforeEach(() => {
    page = new MicropostsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
