import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

export interface HttpEmitAction<T> {
  obser: Observable<T>;
  emit: EventEmitter<T>;
  action: string;
}