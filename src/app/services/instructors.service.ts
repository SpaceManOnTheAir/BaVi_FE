import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObi } from '../models/root-obi';
import { Instructor } from 'src/app/models/instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {
  private instructors: Instructor[] = [];
  constructor(private api: ApiService) {
  }

  getAll(): Observable<RootObi<[Instructor]>> {

    return this.api.get<RootObi<[Instructor]>>(this.api.apiUrl.instructors);
  }
  getId(id: number): Observable<RootObi<Instructor>> {
    return this.api.get<RootObi<Instructor>>(`${this.api.apiUrl.instructors}?id=${id}`);
  }
  add(instructors: Instructor): Observable<RootObi<Instructor>> {
    return this.api.post<RootObi<Instructor>>(`${this.api.apiUrl.instructors}`, instructors);
  }
  update(instructors: Instructor): Observable<RootObi<Instructor>> {
    return this.api.put<RootObi<Instructor>>(`${this.api.apiUrl.instructors}?id=${instructors.id}`, instructors);
  }
  delete(id: number): Observable<RootObi<null>> {
    console.log(`${this.api.apiUrl.instructors}?id=${id}`);
    return this.api.del<RootObi<null>>(`${this.api.apiUrl.instructors}?id=${id}`);
  }
}
