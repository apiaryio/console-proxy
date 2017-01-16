const axios = require('axios');

chrome.runtime.onMessageExternal.addListener((requestOptions, sender, sendResponse) => {
  axios(requestOptions)
    .then((data) => { sendResponse({ data }); }, (err) => {
      let errorCopy = JSON.parse(JSON.stringify(err));
      errorCopy.message = err.message;
      sendResponse({ error: err });
    })

  return true;
});
