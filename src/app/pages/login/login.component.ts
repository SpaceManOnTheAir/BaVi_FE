import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private login: Login[] = [];
  message = '';
  email = '';
  pass = '';
  constructor(private router: Router, private loginService: LoginService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.message = 'New string';
  }
  doLogin() {
    if (this.email === 'admin' && this.pass === '123') {
      this.message = '';
      this.router.navigate(['/home']);
    } else {
      this.message = 'Wrong username or password!';
    }

    // this.message = '';
    // this.loginService.getToken(this.email, this.password).subscribe(res => {
    //   if (res.errorCode === 0) {
    //     this.loginService.setLoggedIn(true);
    //     this.cookieService.set('info', JSON.stringify(res.data)); // convert from string to JSON
    //     this.router.navigate(['/instructor']);
    //   }
    //   else {
    //     this.message = res.message;
    //     console.log(res);
    //   }
    // });
  }
}
