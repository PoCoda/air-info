import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.lastCurrentStatusResponse = this.http.get<CurrentStatusModel>('/current');
  }

  getStreak(): Observable<StreakModel> {
    return this.http.get<StreakModel>('/streak');

  }
}
