'use strict';


let angular = require('angular');

module.exports = angular
  .module('spinnaker.core.config.whatsNew', [])
  .provider('whatsNew', function() {
    let whatsNew = {
      gistId: '',
      fileName: 'news.md',
      accessToken: '',
    };
    return {
      setGistId(gistId) {
        whatsNew.gistId = gistId;
      },
      setFileName(fileName) {
        whatsNew.fileName = fileName;
      },
      setAccessToken(token) {
        whatsNew.accessToken = token;
      },
      $get: function() {
        return {
          gistId() {
            return whatsNew.gistId;
          },
          fileName() {
            return whatsNew.fileName;
          },
          accessToken() {
            return whatsNew.accessToken;
          },
          get() {
            return whatsNew;
          }
        };
      }
    }

;
  });
