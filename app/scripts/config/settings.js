'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.core.config.settings', [])
  .constant('settings', {
    providers: {
      azure: {
        defaults: {
          account: 'azure-test',
          region: 'West US'
        },
      },
      aws: {
        defaults: {
          account: 'test',
          region: 'us-east-1'
        },
        defaultSecurityGroups: ['nf-datacenter-vpc', 'nf-infrastructure-vpc', 'nf-datacenter', 'nf-infrastructure'],
      },
      gce: {
        defaults: {
          account: 'my-google-account',
          region: 'us-central1',
          zone: 'us-central1-f',
        },
      },
      titan: {
        defaults: {
          account: 'titantest',
          region: 'us-east-1'
        },
      }
    },
    alert: {
      url: 'http://atlas-alert-api-main.us-west-1.prod.netflix.net:7001/api/v3/trigger',
      recipients: ['chrisb@netflix.com', 'zthrash@netflix.com'],
      throttleInSeconds: 5 * 60,
      subject: '[Spinnaker] Error in Deck',
      template: 'spinnaker_deck_error',
    },
});
