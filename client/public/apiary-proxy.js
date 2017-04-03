const instance = axios.create({
  validateStatus: () => true
});

const Apiary = {};

Apiary.buildChannel = function (origin, scope) {
  const chan = Channel.build({
    window: window.parent,
    origin: origin,
    scope: scope
  });

  chan.bind('httpRequest', (trans, requestOptions) => {
    trans.delayReturn(true);

    instance(requestOptions)
      .then(trans.complete, (err) => {
        let errorCopy = JSON.parse(JSON.stringify(err));
        errorCopy.message = err.message;
        trans.error(errorCopy);
      })
  })
}

window.Apiary = window.Apiary || Apiary;
