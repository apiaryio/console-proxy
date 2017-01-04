axios.defaults.validateStatus = () => true;

const Apiary = window.Apiary || {};

Apiary.buildChannel = function (origin, scope) {
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

