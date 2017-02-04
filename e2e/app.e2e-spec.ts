import { AppPage } from './app.po';

describe('example-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('fulls1z3\'s example app');
  });
});
