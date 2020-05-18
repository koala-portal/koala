import { NgModule } from '@angular/core';

import { KToolsComponent } from './k-tools.component';
import { KToolFormComponent } from './k-tool-form/k-tool-form.component';
import { KToolFormDialogComponent } from './k-tool-form-dialog/k-tool-form-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core.module';
import { KToolsRoutingModule } from './k-tools-routing.module';
import { UserGuideModule } from '../user-guide/user-guide.module';

@NgModule({
  declarations: [KToolsComponent, KToolFormComponent, KToolFormDialogComponent],
  imports: [CoreModule, SharedModule, UserGuideModule, KToolsRoutingModule],
})
export class KToolsModule {}
