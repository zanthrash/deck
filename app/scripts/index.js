'use strict';

const angular = require('angular');

let modulesToInclude = [
  require('./modules/core'),
];

if (__NETFLIX_ENABLED__) {
  modulesToInclude.push(
    require('./modules/netflix')
  );
}

if (__AMAZON_ENABLED__) {
  modulesToInclude.push(
    require('./modules/amazon')
  );
}

if (__GOOGLE_ENABLED__) {
  modulesToInclude.push(
    require('./modules/google')
  );
}

if (__CLOUDFOUNDRY_ENABLED__) {
  modulesToInclude.push(
    require('./modules/cloudfoundry')
  );
}

if (__TITAN_ENABLED__) {
  modulesToInclude.push(
    require('./modules/titan')
  );
}

// TODO: angular loader doesn't recognize this as a module definition b/c modulesToInclude is not an ArrayExpression
// manually appending .name for now
module.exports = angular.module('netflix.spinnaker', modulesToInclude)
  .run(() => {
    console.info('run: app/scripts/index.js');
  })
  .config(() => {
    console.info('config: app/scripts/index.js');
  })
  .name;


