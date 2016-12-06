const chan = Channel.build({
  window: window.parent,
  origin: "*",
  scope: "apiary-console"
});

chan.bind('httpRequest', (trans, data) => {
  trans.delayReturn(true);

  axios(data.url, data.requestOptions)
    .then((response) => trans.complete({ headers: response.headers, body: response.data }))
    .then(undefined, (err) => trans.error(err.message || err));
})
