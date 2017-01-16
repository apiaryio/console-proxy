const axios = require('axios');

chrome.runtime.onMessageExternal.addListener((data, sender, sendResponse) => {

  if (data.method === 'ping') {
    return sendResponse({ pong: true });
  }

  if (data.method === 'httpRequest') {
    axios(data.params)
      .then((data) => { sendResponse({ data }); }, (err) => {
        let errorCopy = JSON.parse(JSON.stringify(err));
        errorCopy.message = err.message;
        sendResponse({ error: err });
      })
  }

  return true;
});
