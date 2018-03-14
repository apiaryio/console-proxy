exports.config = {
  protocol: 'http',
  specs: [
    'test/*.js'
  ],
  exclude: [
  ],
  capabilities: [{
    browserName: 'chrome',
    version: '54.0',
    platform: 'OS X 10.11'
  }],
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: (process.env.CI ? 'http://console.apiary.test:3000' : 'http://localhost:3000'),
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
