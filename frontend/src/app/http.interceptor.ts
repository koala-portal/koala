import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppService } from './app.service';

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
    let requestCompleted = false;
    return next.handle(req).pipe(
      tap(() => {
        if (!requestCompleted) {
          requestCompleted = true;
          this.onRequestCompleted();
        }
      }),
      catchError((error) => {
        if (!requestCompleted) {
          requestCompleted = true;
          this.onRequestCompleted();
        }

        return throwError(error);
      })
    );
  }

  onRequestCompleted(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.appService.isLoading = false;
    }
  }
}
