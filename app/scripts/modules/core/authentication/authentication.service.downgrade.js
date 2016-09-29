'use strict';

import { AuthenticationService} from './authentication.service.ts';
import { upgradeAdapter } from '../../../app.upgrade.ts';

const angular = require('angular');


let downgradedAuthenticationService = upgradeAdapter.downgradeNg2Provider(AuthenticationService);

module.exports = angular
  .module('spinnaker.authentication.service', [])
  .factory('authenticationService', downgradedAuthenticationService);
