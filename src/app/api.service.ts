import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CurrentStatus {
  "pm10": { 
    "value": number, 
    "percentage": number 
  }, 
  "pm25": {
     "value": number
     "percentage": number 
  }, 
  "matchesNorms": boolean
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = 'localhost:8080'; // test

  getCurrentStatus(): Observable<CurrentStatus> {
    return this.http.get<CurrentStatus>('/current');
  }
}
