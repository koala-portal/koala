import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShortNumberPipe } from './pipes/short-number/short-number.pipe';
import { CoreModule } from '../core.module';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';

@NgModule({
  imports: [CoreModule],
  declarations: [ShortNumberPipe, ConfirmDialogComponent, TruncatePipe],
  exports: [ShortNumberPipe, ConfirmDialogComponent, TruncatePipe],
})
export class SharedModule {}
