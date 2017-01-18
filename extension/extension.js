const axios = require('axios');
const Channel = require('jschannel');

const chan = Channel.build({
  window: window,
  origin: '*',
  scope: 'chromeScope',
  onReady: () => {
    chan.bind('ping', () => {
      return { pong: true };
    });
  }
});


chan.bind('httpRequest', (trans, requestOptions) => {
  trans.delayReturn(true);

  axios(requestOptions)
    .then(trans.complete, (err) => {
      let errorCopy = JSON.parse(JSON.stringify(err));
      errorCopy.message = err.message;
      trans.error(errorCopy);
    })
})

chrome.runtime.onMessageExternal.addListener(({method, params}, sender, sendResponse) => {
  chan.call({
    method,
    params,
    success: (result) => sendResponse(result),
    error: (err) => sendResponse({ error: err })
  });

  return true;
});
