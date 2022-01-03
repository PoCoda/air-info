import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { logging } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

type User = {
  firstName: string;
  lastName: string;
  username: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  $user: Subject<User> = new BehaviorSubject<User>(null as User);

  constructor(private http: HttpClient) { }

  register(login, password) {
    // console.log('User registered: ', user);

    return this.http.post('/api/user/registration', {
      firstName: 'Username',
      lastName: 'Lastname',
      city: 'KRAKOW',
      username: login,
      password,
    }).pipe(tap(
      (response) => {
        console.log('Response: ', response);
        window.localStorage.setItem('token', response['token']);
        this.$user.next(response['user']);
      }
    ));
  }

  login(login, password) {
    console.log('User logged in: ', login);

    return this.http.post('/api/user/login', {
      username: login,
      password,
    }).pipe(tap(
      (response) => {
        console.log('Response: ', response);
        window.localStorage.setItem('token', response['token']);
        this.$user.next(response['user']);
      }
    ));
  }

  changeCity(city): Subscription {
    console.log('User changed city: ', city);

    return this.http.post(`/api/user/city/${city}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }).subscribe(
      (response) => {
        console.log('Response: ', response);
        this.$user.next(response as User);
      }
    );
  }
}
