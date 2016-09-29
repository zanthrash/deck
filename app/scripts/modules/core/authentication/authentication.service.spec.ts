'use strict';

import { AuthenticationService } from './authentication.service.ts';

describe('authenticationService', function() {


  let authenticationService: AuthenticationService;

  beforeEach(() => {
    authenticationService = new AuthenticationService();
  });

  describe('setAuthenticatedUser', function() {
    it('sets name, authenticated flag', function() {
      var user = authenticationService.getAuthenticatedUser();

      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);

      authenticationService.setAuthenticatedUser('kato@example.com');
      expect(user.name).toBe('kato@example.com');
      expect(user.authenticated).toBe(true);
    });

    it('disregards falsy values', function() {
      var user = authenticationService.getAuthenticatedUser();

      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);

      authenticationService.setAuthenticatedUser(null);
      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);

      authenticationService.setAuthenticatedUser(false);
      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);

      authenticationService.setAuthenticatedUser('');
      expect(user.name).toBe('[anonymous]');
      expect(user.authenticated).toBe(false);
    });
  });

  describe('authentication', function () {

    it('fires events and sets user', function () {
      var firedEvents = 0;
      authenticationService.onAuthentication(function() {
        firedEvents++;
      });
      authenticationService.onAuthentication(function() {
        firedEvents++;
      });
      authenticationService.setAuthenticatedUser('foo@bar.com');
      expect(authenticationService.getAuthenticatedUser().name).toBe('foo@bar.com');
      expect(firedEvents).toBe(2);
    });
  });

});
