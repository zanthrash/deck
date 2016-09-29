import {UpgradeAdapter} from "@angular/upgrade";


export class Upgrader {

  private static instance: Upgrader;
  private upgradeAdapter: UpgradeAdapter;

  constructor(module: any) {
    if(!Upgrader.instance) {
      Upgrader.instance = this;
      this.upgradeAdapter = new UpgradeAdapter(module);
    }
    return Upgrader.instance;
  }

}
