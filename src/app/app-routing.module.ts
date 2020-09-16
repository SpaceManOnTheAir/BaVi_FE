import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { StudentEditComponent } from './pages/student/student-edit.component';
import { MajorComponent } from './pages/major/major.component';
import { MajorEditComponent } from './pages/major/major-edit.component';
import { AuthGuard } from './auth.guard';
import { InstructorComponent } from './pages/instructor/instructor.component';
import { InstructorEditComponent } from './pages/instructor/instructor-edit.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path: '', component: DefaultLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'student', component: StudentComponent },
      { path: 'student/:id', component: StudentEditComponent },
      { path: 'major', component: MajorComponent },
      { path: 'major/:id', component: MajorEditComponent },
      { path: 'instructor', component: InstructorComponent },
      { path: 'instructor/:id', component: InstructorEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
