const chan = Channel.build({
  window: window.parent,
  origin: "*",
  scope: "apiary-console"
});

chan.bind('httpRequest', (trans, data) => {
  trans.delayReturn(true);

  fetch(data.url, data.requestOptions)
    .then(response => {
      let content = null;
      if (response.headers.get('Content-Type').includes('application/json')) {
        content = response.json();
      } else {
        content = response.text();
      }

      return Promise.all([response.headers, content]);
    })
    .then(([headers, body]) => {

      let h = {};

      for (let header of headers) {
        h[header[0]] = header[1];
      }

      trans.complete({ headers: h, body });
    })
    .then(undefined, (err) => {
      console.error(`Apiary iFrame error: ${err.message || err}`);
      trans.error(err.message || err);
    });
})
