process.env.NODE_ENV = 'test';
const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin')

var webpackConfig = require(path.join(__dirname, './node_modules/react-scripts/config/webpack.config.dev.js'));
webpackConfig.devtool = 'inline-source-map';
webpackConfig.plugins.push(new DefinePlugin({
  DOMAIN: JSON.stringify('apiary.dev')
}));
webpackConfig.module.preLoaders = [];


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['src/**/iframe/**/**.test.js', 'src/**/JsAgent/**/**.test.js'],
    exclude: [],
    preprocessors: { 'src/**/**.test.js': ['webpack', 'sourcemap'] },
    webpack: webpackConfig,
    reporters: ['mocha', 'junit'],
    junitReporter: {
      outputDir: `${process.env.CIRCLE_TEST_REPORTS || '.'}/unit/iframe`,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'Firefox'],
    singleRun: true,
    concurrency: 1,
  });
}
