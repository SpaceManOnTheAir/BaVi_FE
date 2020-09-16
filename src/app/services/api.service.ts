import { Injectable } from '@angular/core';
import { Student } from 'src/app/models/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://www.saigontech.edu.vn/restful-api/';
  apiUrl = {
    majors: this.baseUrl + 'majors.php',
    students: this.baseUrl + 'students.php',
    logins: this.baseUrl + 'login.php',
    instructors: this.baseUrl + 'instructors.php'
  };
  constructor(private http: HttpClient, private cookie: CookieService) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  del<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
  put<T>(url: string, data: object): Observable<T> {
    return this.http.put<T>(url, data);
  }
  post<T>(url: string, data: object): Observable<T> {
    return this.http.post<T>(url, data);
  }

}
