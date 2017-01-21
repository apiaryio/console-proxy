const base = require('./karma.iframe.conf.js')

module.exports = function (config) {
  base(config);

  config.set({
    files: ['src/**/chrome/**/**.test.js'],
    junitReporter: {
      outputDir: `${process.env.CIRCLE_TEST_REPORTS || '.'}/unit/chrome`,
    },
    browsers: ['ex_Chrome'],
    customLaunchers: {
      ex_Chrome: {
        base: 'Chrome',
        flags: ['--load-extension=../extension']
      }
    },
  });
}
