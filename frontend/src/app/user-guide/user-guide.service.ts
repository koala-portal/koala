import { HttpClient } from '@angular/common/http';
import { Guide } from './guide.model';
import { Subject, Observable, of } from 'rxjs';
import { Section } from './section.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserGuideService {
  private currentSection: Section;
  currentSection$ = new Subject<Section>();

  constructor(private http: HttpClient) {}

  setCurrentSection(currentSection: Section): void {
    this.currentSection = currentSection;
    this.currentSection$.next(this.currentSection);
  }

  post(userGuide: Guide): Observable<Guide> {
    // TODO: Rest call

    return of(userGuide);
  }

  put(userGuide: Guide): Observable<Guide> {
    // TODO: Rest call

    return of(userGuide);
  }
}
