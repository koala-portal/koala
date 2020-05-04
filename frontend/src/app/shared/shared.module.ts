import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShortNumberPipe } from './pipes/short-number/short-number.pipe';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [MaterialModule],
  declarations: [ShortNumberPipe, ConfirmDialogComponent],
  exports: [ShortNumberPipe],
})
export class SharedModule {}
