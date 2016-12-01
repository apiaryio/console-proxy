exports.config = {
  specs: [
    '*.test.js'
  ],
  exclude: [
  ],
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome'
  }],
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: process.env.CI ? 'http://apiary-console.surge.sh:3000' : 'http://localhost:3000',
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
