'use strict';

var path = require('path');
var sharedConfig = require(
  path.join(__dirname, '..', '..', 'webpack.sharedConfig.js')
);

module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      path.join(
        sharedConfig.nodeModulesPath, 'jquery', 'dist', 'jquery.js'
      ),
      path.join(
        sharedConfig.nodeModulesPath, 'angular', 'angular.js'
      ),
      path.join(
        sharedConfig.nodeModulesPath, 'angular-mocks', 'angular-mocks.js'
      ),
      path.join(
        sharedConfig.nodeModulesPath, 'phantomjs-polyfill', 'bind-polyfill.js'
      ),
      path.join(
        __dirname, 'test_index.js'
      ),
    ],

    preprocessors: {
      './**/*.spec.js': ['webpack'],
      'settings.js': ['webpack'],
      './mockApplicationData.js': ['webpack'],
      './test_index.js': ['webpack'],
    },

    webpack: {
      module: sharedConfig.module,
      watch: true,
    },

    webpackMiddleware: {
      noInfo: true,
    },

    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-junit-reporter'),
      require('karma-mocha-reporter'),
      require('karma-jenkins-reporter'),
      require('karma-coverage'),
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8081,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS',
      //'Chrome',
    ],

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.DEBUG,

    // jUnit Report output
    reporters: ['progress', 'mocha'],

    // the default configuration
    junitReporter: {
      outputFile: 'test-results.xml'
    },

    //coverageReporter: {
    //  type : 'html',
    //  dir : 'coverage/'
    //},

    jenkinsReporter: {
      outputFile: 'test-results.xml',
      suite: 'com.netflix.spinnaker.deck',
      classnameSuffix: 'ui-test'
    },

    client: {
      captureConsole: true,
    }
  });
};
