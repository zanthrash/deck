'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.core.config.apiHost', [
    //require('exports?"restangular"!imports?_=lodash!restangular'),
])
  .provider('apiHostConfig', function() {

    let host = null;
    let authEndpoint = null;
    let feedbackEndpoint = null;
    let bakeryDetailEndpoint = null;
    let useHttps = true;
    let authEnabled = false;
    let pollSchedule = 30000;

    let baseUrlFn = () => {
      if (host === null) {
        throw ("API host has not been set. Set with apiHostConfigProvider#setHost");
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
      setFeedbackEndpoint: (endpoint) => {
        feedbackEndpoint = endpoint;
      },
      setBakeryDetail: (endpoint) => {
        bakeryDetailEndpoint = endpoint;
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
      authEnabled: () => {
        return authEnabled;
      },
      baseUrl: baseUrlFn,
      getPollSchedule: () => {
        return pollSchedule;
      },


      $get: function() {
        return {
          setHost: (url) => host = url,
          host: () => {
            return host;
          },
          authEndpoint: () => {
            return authEndpoint;
          },
          feedbackEndpoint: () => {
            return feedbackEndpoint;
          },
          backeryDetailEndpoint: () => {
            return bakeryDetailEndpoint;
          },
          authEnabled: () => {
            return authEnabled;
          },
          disableAuth: () => {
            authEnabled = false;
          },
          enableAuth: () => {
            authEnabled = true;
          },
          getPollSchedule: () => {
            return pollSchedule;
          },
          baseUrl: baseUrlFn
        };
      }
    };

  });
