import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Login } from './models/login';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private route: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const infoStr = this.cookieService.get('info');
    // let info = {} as Login;
    if (infoStr) {
      const info = JSON.parse(infoStr) as Login;
      const headers = new HttpHeaders({
        Authorization: info.accessToken
      });
      request = request.clone({ headers });
    }
    return next.handle(request).pipe(
      tap(event => {
        //  success process
      }, error => {
        if (error.status === 401) {
          this.route.navigate(['/login']);
        }
      })
    );
  }
}


