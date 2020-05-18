import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { KTool } from '../shared/k-tool.model';

@Injectable({ providedIn: 'root' })
export class KToolsService {
  kTool$ = new Subject<KTool[]>();

  private kTools: KTool[] = [];

  private url = environment.urls.api + '/tools';

  constructor(private http: HttpClient) {}

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

  fetchById(id: number): Observable<KTool> {
    return this.http.get<KTool>(this.url + '/' + id);
  }

  fetchAll(): Observable<KTool[]> {
    return this.http.get<KTool[]>(this.url);
  }

  put(kTool: KTool): Observable<KTool> {
    return this.http.put<void>(this.url + '/' + kTool.id, kTool).pipe(
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
    return this.http.post<KTool>(this.url, kTool).pipe(
      tap((kTool) => {
        this.kTools.push(kTool);
        this.kTool$.next(this.getKTools());
      })
    );
  }

  delete(kTool: KTool): Observable<void> {
    return this.http.delete<void>(this.url + '/' + kTool.id).pipe(
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
