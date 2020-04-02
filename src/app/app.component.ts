import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadedFeature = 'ticket';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
