import { Subject, Observable, of, throwError } from 'rxjs';
import { KTool } from '../shared/k-tool.model';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators'
import { User } from './user.model';

import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class KToolsService {
  kTool$ = new Subject<KTool[]>();

  @Output() whoamiEmitter: EventEmitter<User> = new EventEmitter<User>();

  private kTools: KTool[] = [
    {
      id: 'a',
      name: 'Google',
      description: 'Massively popular search engine',
      numUsers: 58105679288,
      starred: true,
      url: 'www.google.com',
    },
    {
      id: 'b',
      name: 'Bing',
      description: 'Massively unpopular search engine',
      numUsers: 8,
      starred: false,
      url: 'www.bing.com',
    },
    {
      id: 'c',
      name: 'WinRAR',
      description: 'Ubiquitous archiving tool',
      numUsers: 5896568,
      starred: true,
      url: 'www.rarlab.com',
    },
    {
      id: 'd',
      name: 'Twitter',
      description: 'A place where people post',
      numUsers: 12353567,
      starred: false,
      url: 'www.twitter.com',
    },
  ];

  constructor(private http: HttpClient, private toastr: ToastrService) { }

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
    var url = 'https://localhost:8443/api/whoami';

    this.http.get(url).
      pipe(
        map((data: User) => {
          this.whoamiEmitter.emit(data);
          return data;
        }), catchError( error => {
          this.toastr.error(  error.error.resolution,
                              error.error.error);
          return throwError( error.error );
        })
      )
      .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err.error)
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
