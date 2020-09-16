import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AuthGuard } from 'src/app/auth.guard';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  userName: string;
  constructor(private cookie: CookieService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    const infoStr = this.cookie.get('info');
    if (infoStr) {
      const info = JSON.parse(infoStr) as Login;
      this.userName = info.fullName;
    }
  }
  logout(event) {
    event.preventDefault();
    this.loginService.setLoggedIn(false);
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
  }

}
