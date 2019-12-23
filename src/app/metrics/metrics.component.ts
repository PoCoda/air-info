import {Component, OnInit} from '@angular/core';

// // TODO move to other file
// export interface Metric {
//   name: string;
//   value: string;
//   percentage: number;
// }

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  //
  // metrics: Metric[] = [
  //   {
  //     name: 'PM10',
  //     value: '10ug',
  //     percentage: 42
  //   },
  //   {
  //     name: 'PM2.5',
  //     value: '30ug',
  //     percentage: 120
  //   },
  //   {
  //     name: 'Harm Factor',
  //     value: '',
  //     percentage: 120
  //   }
  // ];

  constructor() {
  }

  ngOnInit() {
  }

}
