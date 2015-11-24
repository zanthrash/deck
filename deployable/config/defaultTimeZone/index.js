'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.config.defalutTime', [])
  .provider('defaultTimeZone', function() {
    let defaultTimeZone = 'America/Los_Angeles';
    this.set = (tz) => {
      defaultTimeZone = tz;
    };
    this.get = () => defaultTimeZone;

    this.$get = () => ({
      get: this.get,
      set: this.set,
    });
  });
