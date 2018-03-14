process.env.NODE_ENV = 'test';
const path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin')

const defines = {
  DOMAIN: JSON.stringify('apiary.dev'),
  PORT: 80,
  SSL_PORT: 443
}
var webpackConfig = require(path.join(__dirname, './node_modules/react-scripts/config/webpack.config.dev.js'));
webpackConfig.plugins.push(new DefinePlugin(defines));
// make sure the eslint-loader is configured to ignore the `defines` above
const eslintLoader = webpackConfig.module.rules.reduce((res, rule) => {
    return res || rule.use && rule.use.find(use => use.loader.match('eslint-loader'))
}, null);
if (eslintLoader) {
    const globals = eslintLoader.options.globals = eslintLoader.options.globals || [];
    globals.push.apply(globals, Object.keys(defines));
}

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
