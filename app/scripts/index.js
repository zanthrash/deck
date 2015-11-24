'use strict';

const angular = require('angular');

let modulesToInclude = [
  require('./core'),
];

if (__NETFLIX_ENABLED__) {
  modulesToInclude.push(
    require('./netflix')
  );
}

if (__AMAZON_ENABLED__) {
  modulesToInclude.push(
    require('./amazon')
  );
}

if (__GOOGLE_ENABLED__) {
  modulesToInclude.push(
    require('./google')
  );
}

if (__CLOUDFOUNDRY_ENABLED__) {
  modulesToInclude.push(
    require('./cloudfoundry')
  );
}

if (__TITAN_ENABLED__) {
  modulesToInclude.push(
    require('./titan')
  );
}

// TODO: angular loader doesn't recognize this as a module definition b/c modulesToInclude is not an ArrayExpression
// manually appending .name for now
module.exports = angular.module('netflix.spinnaker', modulesToInclude)
.run(() => {
  console.info('run: src/index.jx');
})
.config(() => {
  console.info('config: src/index.jx');
})

.name;

