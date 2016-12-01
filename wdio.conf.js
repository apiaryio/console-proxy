exports.config = {
  protocol: 'http',
  specs: [
    '*.test.js'
  ],
  exclude: [
  ],
  capabilities: [{
    browserName: 'chrome',
    version: 53
  }, {
    browserName: 'firefox',
    version: 50
  }, {
    browserName: 'safari',
    version: 10
  }, {
    browserName: 'microsoftedge',
    version: 14
  }],
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
  sauceConnectOpts: {
    tunnelIdentifier: 'apiary-console-seed-tunnel',
    dns: '8.8.8.8'
  },
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost:3000',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  reporters: ['spec', 'junit'],
  reporterOptions: {
    junit: {
      outputDir: `${process.env.CIRCLE_TEST_REPORTS || '.'}/integration`,
    }
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 10000,
    expectationResultHandler: function (passed, assertion) {
    }
  },
}
