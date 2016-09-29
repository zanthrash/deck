import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { UpgradeAdapter } from '@angular/upgrade';

import { AuthenticationService } from './modules/core/authentication/authentication.service.ts'

declare var angular: any;


export const foo = 'foo';

export const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => SpinnakerModule));
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
class SpinnakerModule {}


