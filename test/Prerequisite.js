describe('Prerequisites', () => {
  describe('Call the same resource with both http client and iframe', () => {
      it('http headers should be less or equal than iframe ones', () => {
        browser.url('/');
        browser.leftClick('.httpCall');
        browser.waitForExist('.detail_headers');
        browser.waitForExist('.detail_data');

        const httpHeadersCount = Object.keys(browser.elements('.detail_headers').value).length;
        const httpBodyCount = Object.keys(browser.elements('.detail_data').value).length;

        browser.refresh();
        browser.leftClick('.iframeCall');
        browser.waitForExist('.detail_headers');
        browser.waitForExist('.detail_data');

        const iframeHeadersCount = Object.keys(browser.elements('.detail_headers').value).length;
        const iframeBodyCount = Object.keys(browser.elements('.detail_data').value).length;

        expect(iframeHeadersCount).toBeGreaterThanOrEqual(httpHeadersCount);
        expect(iframeBodyCount).toBeGreaterThanOrEqual(httpBodyCount);

      });
  })
});
