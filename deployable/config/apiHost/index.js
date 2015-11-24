'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.config.apiHost', [
    //require('exports?"restangular"!imports?_=lodash!restangular'),
])
  .provider('apiHost', function() {

    let host = null;
    let authEndpoint = null;
    let useHttps = true;
    let authEnabled = false;
    let pollSchedule = 30000;

    let baseUrlFn = () => {
      if (host === null) {
        throw ("API host has not been set. Set with apiHostProvider#setHost");
      }
      return useHttps ? `https://${ host }` : `http://${ host }`;
    };


    return {
      setHost: (hostName) => {
        host = hostName;
      },

      setAuthEndpoint: (endpoint) => {
        authEndpoint = endpoint;
      },
      useHttps: (bool) => {
        useHttps = bool;
      },
      setPollSchedule: (durationInMillis) => {
        pollSchedule = durationInMillis;
      },
      disableAuth: () => {
        authEnabled = false;
      },
      enableAuth: () => {
        authEnabled = true;
      },
      baseUrl: baseUrlFn,
      getPollSchedule: () => {
        return pollSchedule;
      },


      $get: function() {
        return {
          host: () => {
            return host;
          },
          authEndpoint: () => {
            return authEndpoint;
          },
          authEnabled: () => {
            return authEnabled;
          },
          getPollSchedule: () => {
            return pollSchedule;
          },
          baseUrl: baseUrlFn
        };
      }
    };

  });
