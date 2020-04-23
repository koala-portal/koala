import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShortNumberPipe } from './pipes/short-number/short-number.pipe';

@NgModule({
  declarations: [ShortNumberPipe, ConfirmDialogComponent],
  exports: [ShortNumberPipe],
})
export class SharedModule {}
