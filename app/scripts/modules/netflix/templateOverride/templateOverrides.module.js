'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.netflix.templateOverride.templateOverrides', [
    require('../../core/templateOverride/templateOverride.registry.js'),
  ])
  .run(function(templateOverrideRegistry, featureFlagConfig) {
    if (featureFlagConfig.get('netflixMode')) {
      templateOverrideRegistry.override('applicationNavHeader', require('./applicationNav.html'));
      templateOverrideRegistry.override('pipelineConfigActions', require('./pipelineConfigActions.html'));
      templateOverrideRegistry.override('spinnakerHeader', require('./spinnakerHeader.html'));
      templateOverrideRegistry.override('aws.serverGroup.securityGroups', require('../serverGroup/awsServerGroupSecurityGroups.html'));
      templateOverrideRegistry.override('aws.serverGroup.capacity', require('../serverGroup/capacity/awsServerGroupCapacity.html'));
      templateOverrideRegistry.override('aws.resize.modal', require('../serverGroup/resize/awsResizeServerGroup.html'));
    }
  });
