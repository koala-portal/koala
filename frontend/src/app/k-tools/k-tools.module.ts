import { NgModule } from '@angular/core';

import { KToolsComponent } from './k-tools.component';
import { KToolItemComponent } from './k-tool-item/k-tool-item.component';
import { KToolFormComponent } from './k-tool-form/k-tool-form.component';
import { KToolFormDialogComponent } from './k-tool-form-dialog/k-tool-form-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [
    KToolsComponent,
    KToolItemComponent,
    KToolFormComponent,
    KToolFormDialogComponent,
  ],
  imports: [CoreModule, SharedModule],
  exports: [KToolItemComponent],
})
export class KToolsModule {}
