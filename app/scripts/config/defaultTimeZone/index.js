'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.config.defaultTime', [])
  .provider('defaultTimeZoneConfig', function() {
    let defaultTimeZone = 'America/Los_Angeles';

    return {
      get: () => defaultTimeZone,
      set: (tz) => {
        defaultTimeZone = tz;
      },
      $get: () => {
        return {
          get: () => defaultTimeZone,
          set: (tz) => {
            defaultTimeZone = tz;
          },
        };
      }
    };
  });
