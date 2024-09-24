import { Component, OnInit } from '@angular/core';
import { TimezoneModel } from './models';
import { ReferenceDataService } from './Services/reference-data.service';
import { cloneWith } from 'lodash';

@Component({
  selector: 'app-indexdb-demo',
  standalone: true,
  imports: [],
  templateUrl: './indexdb-demo.component.html',
  styleUrl: './indexdb-demo.component.scss'
})
export class IndexdbDemoComponent implements OnInit {
  title = 'indexdb-app';
  private timeZones: TimezoneModel[];

  constructor(private referenceDataService: ReferenceDataService) {}

  async ngOnInit() {

    this.timeZones = await this.referenceDataService.timezone_get();
    console.log(this.timeZones)


  }
}
