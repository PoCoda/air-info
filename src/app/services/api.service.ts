import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface CurrentStatusModel {
  pollution: {
    pm10: {
      value: number,
      percentage: number
    },
    pm25: {
      value: number
      percentage: number
    },
    matchesNorms: boolean
  },
  wather: {
    location: string,
    temp: number,
    condition: string
  }
}

export interface DaysModel {
  days: number;
}

export interface PercentageModel {
  percentage: number;
}

export interface WorstDistrictModel extends PercentageModel {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  lastCurrentStatusResponse: Observable<CurrentStatusModel>;
  baseUrl = environment.api; // test
  currentStatus: Observable<CurrentStatusModel> = this._getCurrentStatus();

  getCurrentStatus(): Observable<CurrentStatusModel> {
    return this.currentStatus;
  }

  _getCurrentStatus(): Observable<CurrentStatusModel> {
    const currentStatusModel: Observable<CurrentStatusModel> = this.http.get<CurrentStatusModel>(this.baseUrl + '/info', {
      params: {
        CITY: 'WARSAW'
      }
    });
    return currentStatusModel;
  }

  getStreak(): Observable<DaysModel> {
    // https://blog.fullstacktraining.com/caching-http-requests-with-angular/
    return this.getCurrentStatus().pipe( // TODO optimize getCurrentStatus(), try kind of time-defined memoization with expire time
      flatMap((value: CurrentStatusModel) => {
        if (value.pollution.matchesNorms) {
          return this.http.get<DaysModel>(this.baseUrl + '/streak-matching');
        }
        return this.http.get<DaysModel>(this.baseUrl + '/streak-exceeding');
      }),
      first()
    )
  }

  getBestBestWorstSince(): Observable<DaysModel> {
    return this.getCurrentStatus().pipe( // TODO optimize getCurrentStatus(), try kind of time-defined memoization with expire time
      flatMap((value: CurrentStatusModel) => {
        if (value.pollution.matchesNorms) {
          return this.http.get<DaysModel>(this.baseUrl + '/best-since');
        }
        return this.http.get<DaysModel>(this.baseUrl + '/worst-since');
      }),
      first()
    )
  }

  getThisWeekAveragePercentage(): Observable<PercentageModel> {
    return this.http.get<PercentageModel>(this.baseUrl + '/this-week-average');
  }

  getLastWeekAveragePercentage(): Observable<PercentageModel> {
    return this.http.get<PercentageModel>(this.baseUrl + '/last-week-average');
  }

  getWorstDistrict(): Observable<WorstDistrictModel> {
    return this.http.get<WorstDistrictModel>(this.baseUrl + '/worst-district');
  }
}
