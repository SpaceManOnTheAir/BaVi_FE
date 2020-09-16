import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObi } from '../models/root-obi';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', value.toString());
  }
  get isLoggedIn() {
    return this.loggedInStatus;
  }
  constructor(private api: ApiService) { }
  getToken(username: string, password: string): Observable<RootObi<Login>> {
    const data = {
      username,
      password
    };
    return this.api.post<RootObi<Login>>(`${this.api.apiUrl.logins}`, data);
  }


}
