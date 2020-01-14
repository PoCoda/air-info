import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, first } from 'rxjs/operators';

export interface CurrentStatusModel {
  pm10: { 
    value: number, 
    percentage: number 
  }, 
  pm25: {
     value: number
     percentage: number 
  }, 
  matchesNorms: boolean
}

export interface DaysModel {
  days: number;
}

export interface PercentageModel {
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  lastCurrentStatusResponse: Observable<CurrentStatusModel>;
  baseUrl = 'localhost:8080'; // test
  currentStatus: Observable<CurrentStatusModel> = this._getCurrentStatus();

  getCurrentStatus(): Observable<CurrentStatusModel> {
    return this.currentStatus;
  }

  _getCurrentStatus(): Observable<CurrentStatusModel> {
    const currentStatusModel: Observable<CurrentStatusModel> = this.http.get<CurrentStatusModel>('/current');
    return currentStatusModel;
  }
  
  getStreak(): Observable<DaysModel> {
    // https://blog.fullstacktraining.com/caching-http-requests-with-angular/
    return this.getCurrentStatus().pipe( // TODO optimize getCurrentStatus(), try kind of time-defined memoization with expire time
      flatMap((value: CurrentStatusModel) => {
        if(value.matchesNorms) {
          return this.http.get<DaysModel>('/streak-matching');
        }
        return this.http.get<DaysModel>('/streak-exceeding');
      }),
      first()
    )
  }

  getBestBestWorstSince(): Observable<DaysModel> {
    return this.getCurrentStatus().pipe( // TODO optimize getCurrentStatus(), try kind of time-defined memoization with expire time
      flatMap((value: CurrentStatusModel) => {
        if(value.matchesNorms) {
          return this.http.get<DaysModel>('/best-since');
        }
        return this.http.get<DaysModel>('/worst-since');
      }),
      first()
    )
  }

  getThisWeekAveragePercentage(): Observable<PercentageModel> {
    return this.http.get<PercentageModel>('/this-week-average');
  }

  getLastWeekAveragePercentage(): Observable<PercentageModel> {
    return this.http.get<PercentageModel>('/last-week-average');
  }
}
