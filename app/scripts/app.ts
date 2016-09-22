import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { UpgradeAdapter } from '@angular/upgrade';
import './app.js'

import { AuthenticationService } from './modules/core/authentication/authentication.service.ts'

declare var angular: any;

export const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

/*
 * This is where we upgrade/downgrade or stuff
 */

angular
  .module('spinnaker.authentication.service', [])
  .factory('authenticationService', upgradeAdapter.downgradeNg2Provider(AuthenticationService));

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [
    AuthenticationService
  ]
})
class AppModule {}

/*
 * Boostrap the App
 */
upgradeAdapter.bootstrap(document.body, ['netflix.spinnaker']);

