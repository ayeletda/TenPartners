import { TenPartnersAppPage } from './app.po';

describe('ten-partners-app App', function() {
  let page: TenPartnersAppPage;

  beforeEach(() => {
    page = new TenPartnersAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
