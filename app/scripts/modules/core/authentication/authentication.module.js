'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.authentication', [
  require('./authentication.service.js'),
  require('./authentication.initializer.service.js'),
  require('./authentication.interceptor.service.js')
])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('gateRequestInterceptor');
  })
  .run(function (authenticationInitializer, settings) {
    if(settings.authEnabled) {
      authenticationInitializer.authenticateUser();
    }
  })
  .factory('gateRequestInterceptor', function (apiHostConfig) {
    return {
      request: function (config) {
        if (config.url.indexOf(apiHostConfig.baseUrl()) === 0) {
          config.withCredentials = true;
        }
        return config;
      }
    };
  });
