'use strict';

require('../../../../../fonts/spinnaker/icons.css');
require('./userMenu.less');

let angular = require('angular');

module.exports = angular.module('spinnaker.core.authentication.userMenu', [
  require('../../config/settings.js'),
  'spinnaker.authentication.service',
  require('./userMenu.directive.js')
]);
