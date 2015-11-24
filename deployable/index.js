'use strict';

// deck is reliant on a million jquery features; we need to load it before angular so that angular does not
// try to use its jqLite implementation.
global.$ = global.jQuery = require('jquery');

const angular = require('angular');

module.exports = angular.module('spinnaker-ui-deployable', [
  require('./config/apiHost')
])
.config(function(apiHostProvider) {
  console.log('config : deployable/index.js');
  console.log('GATE_HOST: ', __GATE_HOST__);
  apiHostProvider.setHost(__GATE_HOST__);
});







// setting the window.name to NG_DEFER_BOOTSTRAP! allows us to run this modules config first and then we shim
// in the loading of the src module after.
// the windown.name gets reset when the resumeBootstrap function runs.
window.name = "NG_DEFER_BOOTSTRAP!";
angular.element(document).ready(() => {
  angular.bootstrap(document, ['spinnaker-ui-deployable']);
  angular.resumeBootstrap([
    require('src'),
  ]);
});
