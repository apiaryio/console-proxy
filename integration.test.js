describe('basic test', () => {
  it('should have the right title - the fancy generator way', () => {
    browser.url('http://webdriver.io');
    var title = browser.getTitle();
    expect(title).toBe('nasino pariosino')
  });
});
