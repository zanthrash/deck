'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.core.account.service', [
  require('config'),
  require('exports?"restangular"!imports?_=lodash!restangular'),
  require('../utils/lodash.js'),
  require('../cache/infrastructureCaches.js'),
  require('../cloudProvider/cloudProvider.registry.js'),
])
  .factory('accountService', function( $log, _, Restangular, $q, infrastructureCaches, cloudProviderRegistry, defaultProvidersConfig) {

    let getAllAccountDetailsForProvider = _.memoize((providerName) => {
      return listAccounts(providerName)
        .then((accounts) => $q.all(accounts.map((account) => getAccountDetails(account.name))))
        .catch((e) => {
          $log.warn('Failed to load accounts for provider "' + providerName + '"; exception:', e);
          return [];
        });
    });

    let getPreferredZonesByAccount = _.memoize((providerName) => {
      let preferredZonesByAccount = {};
      return getAllAccountDetailsForProvider(providerName)
        .then((accounts) => {
          accounts.forEach((account) => {
            preferredZonesByAccount[account.name] = {};
            account.regions.forEach((region) => {
              let preferredZones = region.availabilityZones;
              //TODO(chrisberry)
              //Make this pluggable to remove the need for provider tests
              if (providerName === 'azure') {
                preferredZones = [region.name];
              }
              if (region.preferredZones) {
                preferredZones = _.intersection(region.preferredZones, region.availabilityZones);
              }
              preferredZonesByAccount[account.name][region.name] = preferredZones;
            });
          });
          return preferredZonesByAccount;
        });
    });

    function getAvailabilityZonesForAccountAndRegion(providerName, accountName, regionName) {
      return getPreferredZonesByAccount(providerName).then( function(result) {
        return result[accountName] ? result[accountName][regionName] : [];
      });
    }

    function listAccounts(provider) {
      if (provider) {
        return listAccounts().then(function(accounts) {
          return _.filter(accounts, { type: provider });
        });
      }
      return Restangular
        .all('credentials')
        .withHttpConfig({cache: true})
        .getList();
    }

    let listProviders = _.memoize((application) => {
      return listAccounts().then(function(accounts) {
        let allProviders = _.uniq(_.pluck(accounts, 'type'));
        let availableRegisteredProviders = _.intersection(allProviders, cloudProviderRegistry.listRegisteredProviders());
        if (application) {
          let appProviders = application.attributes.cloudProviders ?
            application.attributes.cloudProviders.split(',') :
            defaultProvidersConfig.get().length ?
              defaultProvidersConfig.get() :
              availableRegisteredProviders;
          return _.intersection(availableRegisteredProviders, appProviders);
        }
        return availableRegisteredProviders;
      });
    });

    let getRegionsKeyedByAccount = _.memoize((provider) => {
      var deferred = $q.defer();
      listAccounts(provider).then(function(accounts) {
        $q.all(accounts.reduce(function(acc, account) {
          acc[account.name] = Restangular
            .all('credentials')
            .one(account.name)
            .withHttpConfig({cache: true})
            .get();
          return acc;
        }, {})).then(function(result) {
          deferred.resolve(result);
        });
      });
      return deferred.promise;
    });

    function getAccountDetails(accountName) {
      return Restangular.one('credentials', accountName)
        .withHttpConfig({cache: true})
        .get();
    }

    function getRegionsForAccount(accountName) {
      return getAccountDetails(accountName).then(function(details) {
        return details ? details.regions : [];
      });
    }

    let challengeDestructiveActions = _.memoize((account) => {
      if (!account) {
        return $q.when(false);
      }
      let deferred = $q.defer();
      getAccountDetails(account).then(
        (details) => deferred.resolve(details ? details.challengeDestructiveActions : false),
        () => deferred.resolve(false));
      return deferred.promise;
    });

    return {
      challengeDestructiveActions: challengeDestructiveActions,
      listAccounts: listAccounts,
      listProviders: listProviders,
      getAccountDetails: getAccountDetails,
      getAllAccountDetailsForProvider: getAllAccountDetailsForProvider,
      getRegionsForAccount: getRegionsForAccount,
      getRegionsKeyedByAccount: getRegionsKeyedByAccount,
      getPreferredZonesByAccount: getPreferredZonesByAccount,
      getAvailabilityZonesForAccountAndRegion: getAvailabilityZonesForAccountAndRegion
    };
  });
