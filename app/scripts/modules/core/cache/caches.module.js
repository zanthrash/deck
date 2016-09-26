'use strict';

let angular = require('angular');

module.exports = angular
  .module('spinnaker.core.cache', [
    require('./deckCacheFactory.js'),
    require('./cacheInitializer.js'),
    require('./collapsibleSectionStateCache.js'),
    require('./infrastructureCaches.js'),
  ])
  .run(function($timeout, $injector) {
    $timeout( () => {
      let cacheInitializer = $injector.get('cacheInitializer');
      cacheInitializer.initialize();
    }, 0);
  });
