'use strict';

import { Injectable } from '@angular/core'

let angular = require('angular');

export class User {

  public lastAuthenticated: number;

  constructor(public name: string, public authenticated: boolean) {}

  authenticateUser(userName: string){
    this.name = userName;
    this.authenticated = true;
    this.lastAuthenticated = new Date().getTime();
  }

  expireAuthentication() {
    this.authenticated = false;
  }

}

@Injectable()
export class AuthenticationService {

  user: User = new User('[anonymous]', false);
  authenticationEvents: any[] = [];

  constructor() {}

  setAuthenticatedUser(authenticatedUser) {
    if (authenticatedUser) {
      this.user.authenticateUser(authenticatedUser)
    }
    this.authenticationEvents.forEach((event) => {
      event()
    })
  }

  getAuthenticatedUser() {
    return this.user;
  }

  onAuthentication(event) {
    this.authenticationEvents.push(event)
  }

  authenticationExpired() {
    this.user.expireAuthentication();
  }

}

export var authenticationServiceInjectables: Array<any> = [
  { provide: AuthenticationService, useClass: AuthenticationService }
];


// module.exports = angular.module('spinnaker.authentication.service', [
//   require('angular-ui-bootstrap'),
// ])
//   .factory('authenticationService', function () {
//     var user = {
//       name: '[anonymous]',
//       authenticated: false
//     };
//
//     var onAuthenticationEvents = [];
//
//     function setAuthenticatedUser(authenticatedUser) {
//       if (authenticatedUser) {
//         user.name = authenticatedUser;
//         user.authenticated = true;
//         user.lastAuthenticated = new Date().getTime();
//       }
//       onAuthenticationEvents.forEach(function(event) {
//         event();
//       });
//     }
//
//     function getAuthenticatedUser() {
//       return user;
//     }
//
//     function onAuthentication(event) {
//       onAuthenticationEvents.push(event);
//     }
//
//     function authenticationExpired() {
//       user.authenticated = false;
//     }
//
//     return {
//       setAuthenticatedUser: setAuthenticatedUser,
//       getAuthenticatedUser: getAuthenticatedUser,
//       onAuthentication: onAuthentication,
//       authenticationExpired: authenticationExpired,
//     };
//   });
