import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShortNumberPipe } from './pipes/short-number/short-number.pipe';
import { CoreModule } from '../core.module';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { KToolItemComponent } from './k-tool-item/k-tool-item.component';

@NgModule({
  imports: [CoreModule],
  declarations: [ShortNumberPipe, ConfirmDialogComponent, TruncatePipe, KToolItemComponent],
  exports: [ShortNumberPipe, ConfirmDialogComponent, TruncatePipe, KToolItemComponent],
})
export class SharedModule {}
