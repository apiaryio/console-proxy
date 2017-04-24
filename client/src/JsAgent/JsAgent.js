const axios = require('axios');
const Channel = require('jschannel');
const URI = require('urijs');

const instance = axios.create({
  validateStatus: () => true
});

const Apiary = window.Apiary || {};
Apiary.channels = [];

//This function is exposed for testing purposes.
const buildChannel = Apiary.buildChannel = function buildChannel(origin, scope) {
  const chan = Channel.build({
    window: window.parent,
    origin: origin,
    scope: scope
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
  });

  return chan;
};

Apiary.createAgent = function createAgent({ subdomains }) {
  if (!Array.isArray(subdomains)) {
    throw new Error('subdomains property must be an array');
  }

  subdomains.forEach((subdomain) => {

    const origin = new URI({
      protocol: 'http',
      hostname: DOMAIN,
    }).subdomain(`docs.${subdomain}`);

    const jsapiOrigin = new URI({
      protocol: 'https',
      path: subdomain,
      hostname: DOMAIN,
    }).subdomain('jsapi');

    Apiary.channels.push(buildChannel(origin.toString(), subdomain));
    Apiary.channels.push(buildChannel(jsapiOrigin.toString(), subdomain));
  });
};

Apiary.destroyAgent = function destroyAgent() {
  Apiary.channels.forEach((channel) => channel.destroy);
  Apiary.channels = [];
};

window.Apiary = window.Apiary || Apiary;
