'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.core.search.service', [
  require('config'),
  require('../cache/deckCacheFactory.js')
])
  .factory('searchService', function($q, $http, $log, apiHostConfig) {

    var defaultPageSize = 500;

    function getFallbackResults() {
      return { results: [] };
    }

    function search(params) {
      var defaultParams = {
        pageSize: defaultPageSize
      };

      return $http({
        url: apiHostConfig.baseUrl() + '/search',
        params: angular.extend(defaultParams, params),
        timeout: apiHostConfig.getPollSchedule() * 2 + 5000, // TODO: replace with apiHostConfig call
      })
        .then(
          function(response) {
            return response.data[0] || getFallbackResults();
          },
          function (response) {
            $log.error(response.data, response);
            return getFallbackResults();
          }
        );
    }

    return {
      search: search,
      getFallbackResults: getFallbackResults,
      defaultPageSize: defaultPageSize,
    };
  });
