import { Injectable } from '@angular/core';
import { Major } from '../models/major';
import { JsonPipe } from '@angular/common';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { RootObi } from '../models/root-obi';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MajorService {
  private majors: Major[] = [];
  constructor(
    private api: ApiService) {
    // const stringJSON = localStorage.getItem('major');
    // if (stringJSON) {
    //   this.majors = JSON.parse(stringJSON) as Major[];
    // }
    // else {
    //   const aMajor = {
    //     id: 1,
    //     name: "Business Application"
    //   } as Major;
    //   this.majors.push(aMajor);
    //   this.majors.push({
    //     id: 2,
    //     name: "Programming Fundamentals"
    //   } as Major);
    //   localStorage.setItem('major', JSON.stringify(this.majors));
    // }
  }
  // refresh() {
  //   const stringJSON = localStorage.getItem('major');
  //   this.majors = JSON.parse(stringJSON) as Major[];
  // }
  //   GET ALL THE MAJOR ARRAY
  getAll(): Observable<RootObi<[Major]>> {
    //  this.refresh();
    //   return this.majors;
    //  return this.http.get<RootObi<[Major]>>(this.api.apiUrl.majors);
    return this.api.get<RootObi<[Major]>>(this.api.apiUrl.majors);
  }
  //  GET ONE IN THE MAJOR ARRAY
  getId(id: number): Observable<RootObi<Major>> {
    // this.refresh();
    //return this.http.get<RootObi<Major>>(this.api.apiUrl.majors + '?id=' + id);
    return this.api.get<RootObi<Major>>(`${this.api.apiUrl.majors}?id=${id}`);
  }

  add(major: Major): Observable<RootObi<null>> {
    // this.refresh();
    // try {
    //   const numArr = this.majors.map(x => x.id);
    //   if (numArr.length > 0) {
    //     const max = Math.max(...numArr);
    //     major.id = max + 1;
    //   }
    //   else {
    //     major.id = 1;
    //   }
    //   this.majors.push(major);
    //   localStorage.setItem('major', JSON.stringify(this.majors));
    //   return true;
    // }
    // catch {
    //   return false;
    // }
    //return this.http.post<RootObi<null>>(this.api.apiUrl.majors, major);
    return this.api.post<RootObi<null>>(`${this.api.apiUrl.majors}`, major);
  }
  update(major: Major): Observable<RootObi<null>> {

    // const idx = this.majors.findIndex(x => x.id === major.id);
    // this.majors[idx] = major;
    // save back into local storage
    // localStorage.setItem('major', JSON.stringify(this.majors));
    // return true;
    // return this.http.put<RootObi<null>>(this.api.apiUrl.majors + '?id=' + major.id, major);
    return this.api.put<RootObi<null>>(`${this.api.apiUrl.majors}?id=${major.id}`, major);
  }
  delete(id: number): Observable<RootObi<null>> {
    // try {
    //   const idx = this.majors.findIndex(x => x.id === id);
    //   if (idx >= 0) {
    //     this.majors.splice(idx, 1);
    //     localStorage.setItem('major', JSON.stringify(this.majors));
    //     return true;
    //   }
    // }
    // catch{
    //   return false;
    // }
    console.log(`${this.api.apiUrl.majors}?id=${id}`);
    return this.api.del<RootObi<null>>(`${this.api.apiUrl.majors}?id=${id}`);
  }


}
