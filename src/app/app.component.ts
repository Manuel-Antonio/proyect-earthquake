import { Component } from '@angular/core';
import { FeatureService } from './services/feature.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private featureSrv: FeatureService) {
  
}
  onChangeModeDark() {
    this.featureSrv.onChangeModeDark();
  }

  resultModeDark() : boolean {
    return this.featureSrv.modeDark
  }
}
