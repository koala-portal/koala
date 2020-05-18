import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShortNumberPipe } from './pipes/short-number/short-number.pipe';
import { MaterialModule } from './material.module';
import { KToolItemComponent } from './k-tool-item/k-tool-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [ShortNumberPipe, ConfirmDialogComponent, KToolItemComponent],
  exports: [ShortNumberPipe, KToolItemComponent],
})
export class SharedModule {}
