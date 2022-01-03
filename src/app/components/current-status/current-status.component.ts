import {Component, OnInit} from '@angular/core';
import {ApiService, CurrentStatusModel} from '../../services/api/api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class CurrentStatusComponent implements OnInit {

  harmFactor: number;

  status: Observable<CurrentStatusModel>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.status = this.apiService.getCurrentStatus();
    this.status.subscribe(result => {
      this.harmFactor = (2 * result.pollution.pm25.percentage + result.pollution.pm10.percentage) / 3;
    })
  }
}
