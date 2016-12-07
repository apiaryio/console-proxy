axios.defaults.validateStatus = () => true;

const chan = Channel.build({
  window: window.parent,
  origin: "*",
  scope: "apiary-console"
});

chan.bind('httpRequest', (trans, requestOptions) => {
  trans.delayReturn(true);

  axios(requestOptions)
    .then((response) => trans.complete({ headers: response.headers, body: response.data }))
    .then(undefined, (err) => trans.error(err.message || err));
})
