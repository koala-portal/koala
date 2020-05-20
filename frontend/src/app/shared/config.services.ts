import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigServices {

  readonly koalaOrgName: string = "KXX";

  constructor(private http: HttpClient) { }

  public getPublicConfig(key:String): Observable<String> {
    var url = 'https://localhost:8443/api/config/' + key;
    return this.http.get<String>(url); 
  }

}
