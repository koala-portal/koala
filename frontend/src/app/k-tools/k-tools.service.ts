import { Subject, Observable, of, throwError } from 'rxjs';
import { KTool } from '../shared/k-tool.model';
import { KToolsDummyData } from './k-tools.data';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.model';

import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class KToolsService {
  @Output() whoamiEmitter: EventEmitter<User> = new EventEmitter<User>();

  kTool$ = new Subject<KTool[]>();

  private kTools: KTool[] = KToolsDummyData;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getKTools(): KTool[] {
    return this.kTools.slice();
  }

  addkTool(kTool: KTool): void {
    this.kTools.push(kTool);
    this.kTool$.next(this.getKTools());
  }

  addkTools(kTools: KTool[]): void {
    this.kTools.push(...kTools);
    this.kTool$.next(this.getKTools());
  }

  findById(id: string): KTool {
    return this.kTools.find((kTool) => kTool.id === id);
  }

  star(kTool: KTool): Observable<KTool> {
    kTool.starred = !kTool.starred;
    return this.put(kTool);
  }

  whoAmI(): void {
    // Http Headers

    const url = 'https://localhost:8443/api/whoami';

    this.http
      .get(url, { withCredentials: true })
      .pipe(
        map((data: User) => {
          this.whoamiEmitter.emit(data);
          return data;
        }),
        catchError((error) => {
          this.toastr.error(error.error.resolution, error.error.error);
          return throwError(error.error);
        })
      )
      .subscribe(
        (res) => console.log('HTTP response', res),
        (err) => console.log('HTTP Error', err.error)
      );
  }

  put(kTool: KTool): Observable<KTool> {
    // TODO: Rest call
    this.kTools.splice(
      this.kTools.findIndex((kToolIt) => kToolIt.id === kTool.id),
      1,
      kTool
    );
    this.kTool$.next(this.getKTools());
    return of(kTool);
  }

  post(kTool: KTool): Observable<KTool> {
    // TODO: Rest call
    this.kTools.push(kTool);
    this.kTool$.next(this.getKTools());
    return of(kTool);
  }

  delete(kTool: KTool): Observable<void> {
    // TODO: Rest call
    this.kTools.splice(
      this.kTools.findIndex((kToolIt) => kToolIt.id === kTool.id),
      1
    );
    this.kTool$.next(this.getKTools());
    return of();
  }
}
