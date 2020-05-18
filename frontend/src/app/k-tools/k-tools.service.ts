import { Subject, Observable, of, throwError } from 'rxjs';
import { KTool } from '../shared/k-tool.model';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user.model';

import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class KToolsService {
  @Output() whoamiEmitter: EventEmitter<User> = new EventEmitter<User>();

  kTool$ = new Subject<KTool[]>();

  private kTools: KTool[] = [];

  private url = environment.urls.api + '/tools';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  setKTools(kTools: KTool[]): void {
    this.kTools = kTools;
    this.kTool$.next(this.getKTools());
  }

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

  findById(id: number): KTool {
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

  fetchById(id: number): Observable<KTool> {
    return this.http.get<KTool>(this.url + '/' + id, { withCredentials: true });
  }

  fetchAll(): Observable<KTool[]> {
    return this.http.get<KTool[]>(this.url, { withCredentials: true });
  }

  put(kTool: KTool): Observable<KTool> {
    return this.http
      .put<void>(this.url + '/' + kTool.id, kTool, { withCredentials: true })
      .pipe(
        map(() => {
          const kToolIndex = this.kTools.findIndex(
            (kToolIt) => kToolIt.id === kTool.id
          );
          if (kToolIndex !== -1) {
            // If the updated kTool is in kTools, update it and the sub
            this.kTools.splice(kToolIndex, 1, kTool);
            this.kTool$.next(this.getKTools());
          }
          return kTool;
        })
      );
  }

  post(kTool: KTool): Observable<KTool> {
    return this.http
      .post<KTool>(this.url, kTool, {
        withCredentials: true,
      })
      .pipe(
        tap((kTool) => {
          this.kTools.push(kTool);
          this.kTool$.next(this.getKTools());
        })
      );
  }

  delete(kTool: KTool): Observable<void> {
    return this.http
      .delete<void>(this.url + '/' + kTool.id, { withCredentials: true })
      .pipe(
        tap(() => {
          const kToolIndex = this.kTools.findIndex(
            (kToolIt) => kToolIt.id === kTool.id
          );
          if (kToolIndex !== -1) {
            this.kTools.splice(kToolIndex, 1);
            this.kTool$.next(this.getKTools());
          }
        })
      );
  }
}
