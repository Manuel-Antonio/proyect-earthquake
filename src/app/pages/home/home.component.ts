import { Component } from '@angular/core';
import { FeatureService } from 'src/app/services/feature.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private featureSrv:FeatureService) {
  }
  
  resultModeDark() : boolean {
    return this.featureSrv.modeDark
  }

}
