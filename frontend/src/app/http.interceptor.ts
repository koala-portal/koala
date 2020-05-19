import { map, tap, switchMap, delay } from 'rxjs/operators';
import { AppService } from './app.service';
import { HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  requestCount = 0;

  constructor(private appService: AppService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requestCount++;
    this.appService.isLoading = true;
    return next.handle(req).pipe(
      tap(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          this.appService.isLoading = false;
        }
      })
    );
  }
}
