'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.serverGroup.configure.openstack.instanceSettings', [
  require('angular-ui-router'),
  require('angular-ui-bootstrap'),
  require('../../../../../core/serverGroup/configure/common/basicSettingsMixin.controller.js'),
  require('../../../../../core/modal/wizard/v2modalWizard.service.js'),
  require('../../../../../core/utils/rx.js'),
  require('../../../../../core/image/image.reader.js'),
  require('../../../../../core/naming/naming.service.js'),
  require('../../../../instance/osInstanceTypeSelectField.directive.js'),
])
  .controller('openstackServerGroupInstanceSettingsCtrl', function($scope, $controller, $uibModalStack, $state,
                                                          v2modalWizardService, rx, imageReader) {

    function searchImages(q) {
      $scope.command.backingData.filtered.images = [
        {
          message: '<span class="glyphicon glyphicon-spinning glyphicon-asterisk"></span> Finding results matching "' + q + '"...'
        }
      ];
      return rx.Observable.fromPromise(
        imageReader.findImages({
          provider: $scope.command.selectedProvider,
          q: q,
          region: $scope.command.region,
          account: $scope.command.credentials
        })
      );
    }

    var imageSearchResultsStream = new rx.Subject();

    imageSearchResultsStream
      .throttle(250)
      .flatMapLatest(searchImages)
      .subscribe(function (data) {
        $scope.command.backingData.filtered.images = data;
        $scope.command.backingData.packageImages = $scope.command.backingData.filtered.images;
      });

    this.searchImages = function(q) {
      imageSearchResultsStream.onNext(q);
    };

    $scope.$watch('instanceSettings.$valid', function(newVal) {
      if (newVal) {
        v2modalWizardService.markClean('instance-settings');
        v2modalWizardService.markComplete('instance-settings');
      } else {
        v2modalWizardService.markIncomplete('instance-settings');
      }
    });
  });
