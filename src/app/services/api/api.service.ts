import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { flatMap, first, tap, map } from 'rxjs/operators';
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
  // currentUserCity: string;

  constructor(private http: HttpClient, private userService: UserService) {
    // this.userService.$user.subscribe((user) => {
    //   this.currentUserCity = user.city;
    // })
  }

  lastCurrentStatusResponse: Observable<CurrentStatusModel>;
  baseUrl = environment.api; // test
  // currentStatus: Observable<CurrentStatusModel> = this.userService.$user.pipe(map(user => {
  //   return this._getCurrentStatus(user.city);
  // }));

  getCurrentStatus(): Observable<CurrentStatusModel> {
    return this.userService.$user.pipe(
      flatMap(user => {
        console.log(user);
        
        return this._getCurrentStatus(user && user.city);
      })
    )
  }

  // getCurrentStatus(city): Observable<CurrentStatusModel> {
  //   return this.currentStatus;
  // }

  getParamsFromUrl() {
    const url = window.location.href;
    const params = new URLSearchParams(url.split('?')[1]);
    return params;
  }

  getLastPathSegment(): string {
    return window.location.pathname.split('/').pop();
  }

  _getCurrentStatus(city: string): Observable<CurrentStatusModel> {
    // const city = this.getLastPathSegment();

    // console.log(this.userService.$user)
    console.log(city);

    const currentStatusModel: Observable<CurrentStatusModel> = this.http.get<CurrentStatusModel>(this.baseUrl + '/api' + '/info', {
      params: {
        city: city || 'KRAKOW'
      }
    });
    return currentStatusModel;
  }

  getStreak(): Observable<DaysModel> {
    // https://blog.fullstacktraining.com/caching-http-requests-with-angular/
    return this.getCurrentStatus().pipe( // TODO optimize getCurrentStatus(), try kind of time-defined memoization with expire time
      flatMap((value: CurrentStatusModel) => {
        if (value.pollution.matchesNorms) {
          return this.http.get<DaysModel>(this.baseUrl + '/api' + '/streak-matching');
        }
        return this.http.get<DaysModel>(this.baseUrl + '/api' + '/streak-exceeding');
      }),
      first()
    )
  }

  getBestBestWorstSince(): Observable<DaysModel> {
    return this.getCurrentStatus().pipe( // TODO optimize getCurrentStatus(), try kind of time-defined memoization with expire time
      flatMap((value: CurrentStatusModel) => {
        if (value.pollution.matchesNorms) {
          return this.http.get<DaysModel>(this.baseUrl + '/api' + '/best-since');
        }
        return this.http.get<DaysModel>(this.baseUrl + '/api' + '/worst-since');
      }),
      first()
    )
  }

  getThisWeekAveragePercentage(): Observable<PercentageModel> {
    return this.http.get<PercentageModel>(this.baseUrl + '/api' + '/this-week-average');
  }

  getLastWeekAveragePercentage(): Observable<PercentageModel> {
    return this.http.get<PercentageModel>(this.baseUrl + '/api' + '/last-week-average');
  }

  getWorstDistrict(): Observable<WorstDistrictModel> {
    return this.http.get<WorstDistrictModel>(this.baseUrl + '/api' + '/worst-district');
  }
}
