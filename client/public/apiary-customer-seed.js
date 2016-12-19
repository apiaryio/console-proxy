axios.defaults.validateStatus = () => true;

function buildChannel(origin, scope) {
  const chan = Channel.build({
    window: window.parent,
    origin: origin,
    scope: scope
  });

  chan.bind('httpRequest', (trans, requestOptions) => {
    trans.delayReturn(true);

    axios(requestOptions)
      .then(trans.complete, trans.error)
  })
}
