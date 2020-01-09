import { Component, OnInit } from '@angular/core';
import { ApiService, CurrentStatusModel, DaysModel } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-info',
  templateUrl: './text-info.component.html',
  styleUrls: ['./text-info.component.scss']
})
export class TextInfoComponent implements OnInit {
  today: string = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getFullYear() - 1);
  status: Observable<CurrentStatusModel>;
  streak: Observable<DaysModel>;
  bestWorstSince: Observable<DaysModel>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.status = this.apiService.getCurrentStatus();
    this.streak = this.apiService.getStreak();
    this.bestWorstSince = this.apiService.getBestBestWorstSince();
  }

}
