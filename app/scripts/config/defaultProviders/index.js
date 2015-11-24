'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.config.defautProviders.config.provider', [])
  .provider('defaultProvidersConfig', function() {

    let defaultProviders = [];

    let setFn = (providerList) => {
      defaultProviders.push(...providerList);
    };

    return {
      set: setFn,
      $get: () => {
        return {
          get: () => defaultProviders,
          set: setFn
        };
      }
    };
  });
