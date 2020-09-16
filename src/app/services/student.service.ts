import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObi } from '../models/root-obi';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  constructor(private http: HttpClient,
    private api: ApiService) {
  }

  getAll(): Observable<RootObi<[Student]>> {
    // this.refresh();
    // return this.students;
    //console.log(this.api.get<RootObi<[Student]>>(this.api.apiUrl.students));
    return this.api.get<RootObi<[Student]>>(this.api.apiUrl.students);
  }
  getByMajor(id: number): Observable<RootObi<[Student]>> {
    let url = this.api.apiUrl.students;
    if (id > 0) {
      url += `?action=getByMajor&id=${id}`;
    }
    return this.api.get<RootObi<[Student]>>(url);
  }
  getId(id: number): Observable<RootObi<Student>> {
    return this.api.get<RootObi<Student>>(`${this.api.apiUrl.students}?id=${id}`);
  }
  add(student: Student): Observable<RootObi<Student>> {
    return this.api.post<RootObi<Student>>(`${this.api.apiUrl.students}`, student);
  }
  update(student: Student): Observable<RootObi<Student>> {
    return this.api.put<RootObi<Student>>(`${this.api.apiUrl.students}?id=${student.id}`, student);
  }
  delete(id: number): Observable<RootObi<null>> {
    console.log(`${this.api.apiUrl.students}?id=${id}`);
    return this.api.del<RootObi<null>>(`${this.api.apiUrl.students}?id=${id}`);
  }
  // add(student: Student): boolean {
  //   this.refresh();
  //   try {
  //     const numArr = this.students.map(y => y.id);
  //     if (numArr.length > 0) {
  //       const maxId = Math.max(...numArr);
  //       student.id = (maxId + 1);
  //     } else {
  //       student.id = 1;
  //     }

  //     this.students.push(student);
  //     // save back into local storage
  //     localStorage.setItem('students', JSON.stringify(this.students));
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }
  // update(student: Student): boolean {
  //   this.refresh();
  //   try {
  //     const idx = this.students.findIndex( x => x.id === student.id);
  //     this.students[idx] = student;
  //     // save back into local storage
  //     localStorage.setItem('students', JSON.stringify(this.students));
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }
  // delete(id: number): boolean {
  //   this.refresh();
  //   const idx = this.students.findIndex( x => x.id === id);
  //   if (idx >= 0) {
  //     this.students.splice(idx, 1);
  //     localStorage.setItem('students', JSON.stringify(this.students));
  //     return true;
  //   }
  //   return false;
  // }
}
  // const studentJSON = localStorage.getItem('students');
    // if (studentJSON) {
    //   this.students = JSON.parse(studentJSON) as Student[];
    // } else {
    //   // init seed data;
    //   const aStudent = {
    //     id: 1,
    //     uid: 'STU001',
    //     fullName: 'Nguyễn Văn A',
    //     phone: '35085835',
    //     email: 'anv@yahoo.com',
    //     gender: true
    //   } as Student;
    //   this.students.push(aStudent);
    //   this.students.push({
    //     id: 2,
    //     uid: 'STU002',
    //     fullName: 'Nguyễn Văn B',
    //     email: 'bnv@yahoo.com',
    //     gender: false
    //   } as Student);
    //   this.students.push({
    //     id: 3,
    //     uid: 'STU003',
    //     fullName: 'Nguyễn Văn C',
    //     phone: '35085835'
    //   } as Student);
    //   localStorage.setItem('students', JSON.stringify(this.students));
    // }