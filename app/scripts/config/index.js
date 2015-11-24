'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.core.config', [
    require('./apiHost'),
    require('./defaultTimeZone'),
    require('./featureFlags'),
    require('./whatsNew'),
    require('./defaultProviders'),
    require('./settings'),
  ]);
