const baseConf = require('./wdio.conf.js');

baseConf.config.services = ['sauce'];
baseConf.config.user = process.env.SAUCE_USERNAME;
baseConf.config.key = process.env.SAUCE_ACCESS_KEY;
baseConf.config.sauceConnect = true;
baseConf.config.sauceConnectOpts = {
  dns: '8.8.8.8'
};

baseConf.config.capabilities.push(
  {
    browserName: 'firefox',
    version: '47.0',
    platform: 'Windows 10'
  }, {
    browserName: 'chrome',
    version: '55.0',
    platform: 'OS X 10.11'
  }, {
    browserName: 'microsoftedge',
    version: '14.14393',
    platform: 'Windows 10'
  }
);

exports.config = baseConf.config;
