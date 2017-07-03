import { AngularJwtPage } from './app.po';

describe('angular-jwt App', () => {
  let page: AngularJwtPage;

  beforeEach(() => {
    page = new AngularJwtPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
