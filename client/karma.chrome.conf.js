process.env.NODE_ENV = 'test';
const path = require('path');

var webpackConfig = require(path.join(__dirname, './node_modules/react-scripts/config/webpack.config.dev.js'));
webpackConfig.devtool = 'inline-source-map';


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/**/chrome/**/**.test.js'],
    exclude: [],
    preprocessors: { 'src/**/**.test.js': ['webpack', 'sourcemap'] },
    webpack: webpackConfig,
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ex_Chrome'],
    singleRun: true,
    customLaunchers: {
      ex_Chrome: {
        base: 'Chrome',
        flags: ['--load-extension=../extension']
      }
    },
    concurrency: 1,
  })
}
