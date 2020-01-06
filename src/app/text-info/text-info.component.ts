import { Component, OnInit } from '@angular/core';
import { ApiService, CurrentStatusModel, StreakModel } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-info',
  templateUrl: './text-info.component.html',
  styleUrls: ['./text-info.component.scss']
})
export class TextInfosComponent implements OnInit {
  // faCoffee = faCoffee;
  today: string = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getFullYear() - 1);
  status: Observable<CurrentStatusModel>;
  streak: Observable<StreakModel>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.status = this.apiService.getCurrentStatus();
    this.streak = this.apiService.getStreak();
  }

}
