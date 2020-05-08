import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

export interface HttpEmitAction<T> {
  obser: Observable<T>;
  emit: EventEmitter<T>;
  action: string;
}
