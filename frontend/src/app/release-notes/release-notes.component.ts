import { Component, OnInit } from '@angular/core';
import { ReleaseNote } from './release-note.model';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
})
export class ReleaseNotesComponent implements OnInit {
  releaseNotes: ReleaseNote[] = [
    {
      id: 1,
      kTool: null,
      releaseDate: new Date('01/30/2012'),
      name: 'Release 1',
      description: `Deserunt quis veniam ad sit in aliquip ullamco Lorem magna. Veniam elit consectetur nostrud et sunt. Est labore pariatur est tempor fugiat sunt culpa in nisi do excepteur labore excepteur tempor. Aute voluptate voluptate eu proident.

      Est minim sunt enim veniam in in est occaecat. In sit voluptate officia anim et tempor nostrud elit. Commodo sunt laboris amet laboris cillum veniam exercitation mollit irure nisi sunt consequat deserunt dolor. Commodo fugiat non commodo id aute exercitation irure nulla.

      Duis incididunt ullamco elit id nisi. Cupidatat pariatur esse nisi aute dolor quis proident occaecat commodo exercitation laboris. Exercitation nostrud Lorem commodo irure do anim nulla ad nulla elit veniam excepteur nisi. Amet consectetur nulla veniam exercitation.

      Mollit proident mollit fugiat anim enim commodo fugiat non veniam velit et esse enim. Lorem culpa proident velit minim culpa proident quis consequat tempor eiusmod. Enim laboris minim eiusmod ut ullamco reprehenderit duis culpa quis. Lorem labore velit exercitation mollit excepteur exercitation adipisicing labore exercitation non. Ea nostrud eiusmod esse qui anim irure enim cupidatat commodo mollit culpa. In eu eu Lorem cillum minim commodo ut proident sunt id voluptate elit. Mollit non non ex veniam occaecat.`,
      versionNumber: '1.0',
    },
    {
      id: 2,
      kTool: null,
      releaseDate: new Date('06/17/2017'),
      name: 'Release 2',
      description: `Deserunt quis veniam ad sit in aliquip ullamco Lorem magna. Veniam elit consectetur nostrud et sunt. Est labore pariatur est tempor fugiat sunt culpa in nisi do excepteur labore excepteur tempor. Aute voluptate voluptate eu proident.

      Est minim sunt enim veniam in in est occaecat. In sit voluptate officia anim et tempor nostrud elit. Commodo sunt laboris amet laboris cillum veniam exercitation mollit irure nisi sunt consequat deserunt dolor. Commodo fugiat non commodo id aute exercitation irure nulla.

      Duis incididunt ullamco elit id nisi. Cupidatat pariatur esse nisi aute dolor quis proident occaecat commodo exercitation laboris. Exercitation nostrud Lorem commodo irure do anim nulla ad nulla elit veniam excepteur nisi. Amet consectetur nulla veniam exercitation.

      Mollit proident mollit fugiat anim enim commodo fugiat non veniam velit et esse enim. Lorem culpa proident velit minim culpa proident quis consequat tempor eiusmod. Enim laboris minim eiusmod ut ullamco reprehenderit duis culpa quis. Lorem labore velit exercitation mollit excepteur exercitation adipisicing labore exercitation non. Ea nostrud eiusmod esse qui anim irure enim cupidatat commodo mollit culpa. In eu eu Lorem cillum minim commodo ut proident sunt id voluptate elit. Mollit non non ex veniam occaecat.`,
      versionNumber: '2.0',
    },
    {
      id: 3,
      kTool: null,
      releaseDate: new Date('04/25/2020'),
      name: 'Release 3',
      description: `Deserunt quis veniam ad sit in aliquip ullamco Lorem magna. Veniam elit consectetur nostrud et sunt. Est labore pariatur est tempor fugiat sunt culpa in nisi do excepteur labore excepteur tempor. Aute voluptate voluptate eu proident.

      Est minim sunt enim veniam in in est occaecat. In sit voluptate officia anim et tempor nostrud elit. Commodo sunt laboris amet laboris cillum veniam exercitation mollit irure nisi sunt consequat deserunt dolor. Commodo fugiat non commodo id aute exercitation irure nulla.

      Duis incididunt ullamco elit id nisi. Cupidatat pariatur esse nisi aute dolor quis proident occaecat commodo exercitation laboris. Exercitation nostrud Lorem commodo irure do anim nulla ad nulla elit veniam excepteur nisi. Amet consectetur nulla veniam exercitation.

      Mollit proident mollit fugiat anim enim commodo fugiat non veniam velit et esse enim. Lorem culpa proident velit minim culpa proident quis consequat tempor eiusmod. Enim laboris minim eiusmod ut ullamco reprehenderit duis culpa quis. Lorem labore velit exercitation mollit excepteur exercitation adipisicing labore exercitation non. Ea nostrud eiusmod esse qui anim irure enim cupidatat commodo mollit culpa. In eu eu Lorem cillum minim commodo ut proident sunt id voluptate elit. Mollit non non ex veniam occaecat.`,
      versionNumber: '3.0',
    },
  ];

  selectedReleaseNote: ReleaseNote;

  constructor() {}

  ngOnInit(): void {
    this.releaseNotes = this.releaseNotes.sort((a, b) =>
      a.releaseDate < b.releaseDate ? 1 : -1
    );
    this.selectedReleaseNote = this.releaseNotes[0];
  }

  onOpenReleaseNote(releaseNote: ReleaseNote): void {
    this.selectedReleaseNote = releaseNote;
  }
}
