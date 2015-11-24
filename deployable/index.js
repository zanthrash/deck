'use strict';

// deck is reliant on a million jquery features; we need to load it before angular so that angular does not
// try to use its jqLite implementation.
global.$ = global.jQuery = require('jquery');

const angular = require('angular');

module.exports = angular.module('spinnaker-ui-deployable', [
  require('config')
])
.config(function(apiHostConfigProvider) {
  console.log('config : deployable/index.js');
  console.log('GATE_HOST: ', __GATE_HOST__);
  apiHostConfigProvider.setHost(__GATE_HOST__);
  apiHostConfigProvider.setAuthEndpoint(__AUTH_ENDPOINT__);
  apiHostConfigProvider.setFeedbackEndpoint(__FEEDBACK_URL__);
  apiHostConfigProvider.setBakeryDetail(__BAKERY_DETAIL_URL__);
  apiHostConfigProvider.disableAuth();
})
.config(function(defaultTimeZoneConfigProvider){
  defaultTimeZoneConfigProvider.set(__DEFAULT_TIME_ZONE__);
})
.config(function(featureFlagConfigProvider) {
  featureFlagConfigProvider.set('rebakeControlEnabled', __FEATURE_REBAKE_ENABELED__);
  featureFlagConfigProvider.set('netflixMode', __FEATURE_NETFLIX_MODE_ENABELED__);
  featureFlagConfigProvider.set('blesk', __FEATURE_BLESK_ENABLED__);
  featureFlagConfigProvider.set('fastProperty', __FEATURE_FAST_PROPERTIES_ENABLED__);
  featureFlagConfigProvider.set('vpcMigrator', __FEATURE_VPC_MIGRATOR_ENABELED__);
  featureFlagConfigProvider.set('clusterDiff', __FEATURE_CLUSTER_DIFF_ENABLED__);
  featureFlagConfigProvider.set('pipelines', __FEATRUE_PIPELINES_ENABLED__);
})
.config(function(whatsNewConfigProvider) {
  whatsNewConfigProvider.setGistId(__WHATS_NEW_GIST_ID__);
  whatsNewConfigProvider.setFileName(__WHATS_NEW_FILE_NAME__);
  whatsNewConfigProvider.setAccessToken(__WHATS_NEW_ACCESS_TOKEN__);
})
.config(function(defaultProvidersConfigProvider) {
  defaultProvidersConfigProvider.set(__DEFAULT_PROVIDERS__);
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
