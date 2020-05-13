import { Subject, Observable, of, throwError } from 'rxjs';
import { KTool } from '../shared/k-tool.model';
import { KToolsDummyData } from './k-tools.data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KToolsService {

  kTool$ = new Subject<KTool[]>();

  private kTools: KTool[] = KToolsDummyData;

  constructor() {}

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
