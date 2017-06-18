import { TenPartnersAppPage } from './app.po';

describe('ten-partners-app App', () => {
  let page: TenPartnersAppPage;

  beforeEach(() => {
    page = new TenPartnersAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
