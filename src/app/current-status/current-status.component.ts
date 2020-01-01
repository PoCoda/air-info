import {Component, OnInit} from '@angular/core';
import {ApiService, CurrentStatus} from '../api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {

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
