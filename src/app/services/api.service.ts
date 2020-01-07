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

export interface StreakModel {
  days: number;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  lastCurrentStatusResponse: Observable<CurrentStatusModel>;
  baseUrl = 'localhost:8080'; // test

  getCurrentStatus(): Observable<CurrentStatusModel> {
    const currentStatusModel: Observable<CurrentStatusModel> = this.http.get<CurrentStatusModel>('/current');
    return currentStatusModel;
  }

  getStreak(): Observable<StreakModel> {
    return this.getCurrentStatus().pipe( // TODO optimize getCurrentStatus(), try kind of time-defined memoization with expire time
      flatMap((value: CurrentStatusModel) => {
        if(value.matchesNorms) {
          return this.http.get<StreakModel>('/streak-matching');
        }
        return this.http.get<StreakModel>('/streak-exceeding');
      }),
      first()
    )
    

  }
}
