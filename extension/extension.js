const axios = require('axios');
const Channel = require('jschannel');

const instance = axios.create({
  validateStatus: () => true
});

const chan = Channel.build({
  window: window,
  origin: '*',
  scope: 'chromeScope',
  remote: 'ping',
  onReady: () => {
    chan.bind('ping', (trans) => {
      trans.delayReturn(true);
      chrome.tabs.getSelected(null, (tab) => {
        window.chrome.pageAction.show(tab.id);
        trans.complete({ pong: true });
    });
  });
  }
});


chan.bind('httpRequest', (trans, requestOptions) => {
  trans.delayReturn(true);

  instance(requestOptions)
    .then(trans.complete)
    .catch((err) => {
      let errorCopy = JSON.parse(JSON.stringify(err));
      errorCopy.message = err.message;
      trans.error(errorCopy);
    })
})

chrome.runtime.onMessageExternal.addListener(({ method, params }, sender, sendResponse) => {
  chan.call({
    method,
    params,
    success: (result) => sendResponse(result),
    error: (err) => sendResponse({ error: err })
  });

  return true;
});
