import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Section } from './section.model';
import { UserGuide } from './user-guide.model';

@Injectable({ providedIn: 'root' })
export class UserGuideService {
  /**
   * The user guide loaded by the user guide page
   */
  private userGuide: UserGuide;
  userGuide$ = new BehaviorSubject<UserGuide>(null);

  /**
   * The currently selected/focused user guide section
   */
  private currentSection: Section;
  currentSection$ = new Subject<Section>();

  constructor(private http: HttpClient) {}

  getUserGuide(): UserGuide {
    return this.userGuide;
  }

  setUserGuide(userGuide: UserGuide): void {
    this.userGuide = userGuide;
    this.userGuide$.next(this.userGuide);
  }

  setCurrentSection(currentSection: Section): void {
    this.currentSection = currentSection;
    this.currentSection$.next(this.currentSection);
  }

  fetchByKToolId(id: number): Observable<UserGuide> {
    // TODO: Rest Call

    return of(null);
  }

  post(userGuide: UserGuide): Observable<UserGuide> {
    // TODO: Rest call

    return of(userGuide);
  }

  put(userGuide: UserGuide): Observable<UserGuide> {
    // TODO: Rest call

    return of(userGuide);
  }

  findSectionById(id: number): Section {
    return this.userGuide.sections.find((section) => section.id === id);
  }

  findSectionIndexById(id: number): number {
    return this.userGuide.sections.findIndex((section) => section.id === id);
  }

  putSection(section: Section): Observable<UserGuide> {
    this.userGuide.sections.splice(
      this.findSectionIndexById(section.id),
      1,
      section
    );
    return this.put(this.userGuide);
  }

  deleteSection(section: Section): Observable<UserGuide> {
    this.userGuide.sections.splice(this.findSectionIndexById(section.id), 1);
    return this.put(this.userGuide);
  }

  postSection(section: Section): Observable<UserGuide> {
    this.userGuide.sections.push(section);
    return this.put(this.userGuide);
  }
}
