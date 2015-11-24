'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.featureFlags', [])
  .provider('featureFlagConfig', function() {
    let featureFlags = {};

    return {
      set: (flag, value) => {
        featureFlags[flag] = value;
      },
      get(flag) {
        return featureFlags[flag] || false;
      },
      $get: function() {
        return {
          get(flag) {
            return featureFlags[flag] || false;
          },
          enable(flag) {
            featureFlags[flag] = true;
          },
          disable(flag) {
            featureFlags[flag] = false;
          },
          set(flag, value) {
            featureFlags[flag] = value;
          },
          getAll() {
            return featureFlags;
          },
        };
      }
    };
  });
