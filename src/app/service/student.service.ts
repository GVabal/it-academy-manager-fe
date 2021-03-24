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

  addStudent(student: Student, picture: File | null): Observable<Student> {
    const request = this.prepareStudentRequest(student, picture);
    return this.http.post<Student>(apiUrl, request, {headers: {enctype: 'multipart/form-data'}});
  }

  updateStudent(student: Student, id: number, picture: File | null): Observable<Student> {
    const formData = this.prepareStudentRequest(student, picture);
    return this.http.put<Student>(`${apiUrl}/${id}`, formData, {headers: {enctype: 'multipart/form-data'}});
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${apiUrl}/${id}`);
  }

  loadStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(apiUrl);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`);
  }

  private prepareStudentRequest(student: Student, picture: File | null): FormData {
    const formData = new FormData();
    if (picture !== null) {
      formData.append('picture', new Blob([picture], {
        type: 'image/jpeg'
      }));
    }
    formData.append('request', new Blob([JSON.stringify(student)], {
        type: 'application/json'
      }
    ));
    return formData;
  }
}
