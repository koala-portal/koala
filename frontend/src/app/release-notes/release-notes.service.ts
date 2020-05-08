import { Injectable } from '@angular/core';
import { ReleaseNotes } from './release-notes.model';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from './release-notes.data';

@Injectable({ providedIn: 'root' })
export class ReleaseNotesService {
  private releaseNotesList: ReleaseNotes[] = data;
  releaseNotesList$ = new BehaviorSubject<ReleaseNotes[]>(data);

  private toolsUrl = '';

  constructor(private http: HttpClient) {}

  getReleaseNotesList(): ReleaseNotes[] {
    return this.releaseNotesList.slice();
  }

  setReleaseNotesList(releaseNotesList: ReleaseNotes[]): void {
    this.releaseNotesList = releaseNotesList;
    this.releaseNotesList$.next(this.getReleaseNotesList());
  }

  fetchAllByKToolId(id: number): Observable<ReleaseNotes[]> {
    return this.http.get<ReleaseNotes[]>(
      `${this.toolsUrl}/${id}/releaseNotes`,
      {
        withCredentials: true,
      }
    );
  }

  put(releaseNotes: ReleaseNotes): Observable<ReleaseNotes> {
    this.releaseNotesList.splice(
      this.findIndexById(releaseNotes.id),
      1,
      releaseNotes
    );
    this.releaseNotesList$.next(this.getReleaseNotesList());
    return of(releaseNotes);
  }

  post(releaseNotes: ReleaseNotes): Observable<ReleaseNotes> {
    this.releaseNotesList.push(releaseNotes);
    this.setReleaseNotesList(this.releaseNotesList);
    return of(releaseNotes);
  }

  private findIndexById(id: number): number {
    return this.releaseNotesList.findIndex((releaseNotes) => {
      return releaseNotes.id === id;
    });
  }
}
