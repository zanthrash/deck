import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { UpgradeAdapter } from '@angular/upgrade';

declare var angular: any;

const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: []
})

class AppModule {}


upgradeAdapter.bootstrap(document.body, ['netflix.spinnaker']);

