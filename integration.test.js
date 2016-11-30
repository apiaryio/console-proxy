describe('The most basic test', () => {
  it('http click', () => {
    browser.url('http://apiary-console.surge.sh:3000');
    browser.leftClick('.httpCall');
    browser.waitForExist('.detail_headers');
    browser.waitForExist('.detail_body');

    const httpHeadersCount = Object.keys(browser.elements('.detail_headers').value).length;
    const httpBodyCount = Object.keys(browser.elements('.detail_body').value).length;

    browser.leftClick('.iframeCall');
    browser.waitForExist('.detail_headers');
    browser.waitForExist('.detail_body');

    const iframeHeadersCount = Object.keys(browser.elements('.detail_headers').value).length;
    const iframeBodyCount = Object.keys(browser.elements('.detail_body').value).length;

    expect(iframeHeadersCount).toBeGreaterThanOrEqual(httpHeadersCount);
    expect(iframeBodyCount).toBeGreaterThanOrEqual(httpBodyCount);

  });
});
