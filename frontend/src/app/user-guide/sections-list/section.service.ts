import { of, Observable } from 'rxjs';
import { Section } from './../section.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SectionService {
  constructor(private http: HttpClient) {}

  put(section: Section): Observable<Section> {
    return of(section);
  }
}
