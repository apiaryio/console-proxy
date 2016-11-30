
describe('The most basic test', () => {
  it('http click', () => {
    browser.debug();
    browser.url('https://apiary-console.surge.sh');
    browser.leftClick('.httpCall');
    browser.waitForExist('.headers');
    browser.waitForExist('.body');

    const headersCount = Object.keys(browser.elements('.detail_headers').value).length;
    const bodyCount = Object.keys(browser.elements('.detail_body').value).length;

    expect(headersCount).toBe(bodyCount);
  });
});
