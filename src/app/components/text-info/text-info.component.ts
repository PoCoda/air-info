import { Component, OnInit } from '@angular/core';
import { ApiService, CurrentStatusModel, DaysModel, PercentageModel } from '../../services/api.service';
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
  lastWeekAveragePercentage: Observable<PercentageModel>;
  thisWeekAveragePercentage: Observable<PercentageModel>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.status = this.apiService.getCurrentStatus();
    this.streak = this.apiService.getStreak();
    this.bestWorstSince = this.apiService.getBestBestWorstSince();
    this.thisWeekAveragePercentage = this.apiService.getThisWeekAveragePercentage();
    this.lastWeekAveragePercentage = this.apiService.getLastWeekAveragePercentage();
  }

}
