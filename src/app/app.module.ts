import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentComponent } from './pages/student/student.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { StudentEditComponent } from './pages/student/student-edit.component';
import { MajorComponent } from './pages/major/major.component';
import { MajorEditComponent } from './pages/major/major-edit.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { InstructorComponent } from './pages/instructor/instructor.component';
import { InstructorEditComponent } from './pages/instructor/instructor-edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { InputComponent } from './controls/input/input.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HomeComponent,
    LoginComponent,
    DefaultLayoutComponent,
    StudentEditComponent,
    MajorComponent,
    MajorEditComponent,
    InstructorComponent,
    InstructorEditComponent,
    InputComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
