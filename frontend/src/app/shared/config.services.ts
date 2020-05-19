import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigServices {
  constructor(private http: HttpClient) {}

  public getPublicConfig(key: string): Observable<string> {
    const url = 'https://localhost:8443/api/config/' + key;
    return this.http.get<string>(url);
  }
}
