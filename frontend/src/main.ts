import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//import {LicenseManager} from '../node_modules/ag-grid-enterprise/dist/lib/licenseManager';
//LicenseManager.setLicenseKey("For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-18_July_2020_[v2]_MTU5NTAyNjgwMDAwMA==f73bd8ca97817c0fd47ae9b39bdeb3d6");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
