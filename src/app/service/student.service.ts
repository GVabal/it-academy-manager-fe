import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../shared/student';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const apiUrl = `${environment.baseUrl}/students`;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(apiUrl, student);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(apiUrl + '/' + id);
  }
}
