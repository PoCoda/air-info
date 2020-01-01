import {Component, OnInit} from '@angular/core';
import {ApiService, CurrentStatus} from '../api.service';
import { Observable } from 'rxjs';
// // TODO move to other file
// export interface Metric {
//   name: string;
//   value: string;
//   percentage: number;
// }

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {
  //
  // current-status: Metric[] = [
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

  harmFactor: number;

  status: Observable<CurrentStatus>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.status = this.apiService.getCurrentStatus();
    this.status.subscribe(result => {
      this.harmFactor = (2 * result.pm25.percentage + result.pm10.percentage) / 3;
    })
  }
}
