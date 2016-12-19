axios.defaults.validateStatus = () => true;

const chan = Channel.build({
  window: window.parent,
  origin: "*",
  scope: "apiary-console"
});

chan.bind('httpRequest', (trans, requestOptions) => {
  trans.delayReturn(true);

  axios(requestOptions)
    .then(trans.complete, trans.error)
})
