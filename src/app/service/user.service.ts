import { Injectable } from '@angular/core';
import {RegistrationRequest} from '../shared/registrationRequest';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const apiUrl = `${environment.baseUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(request: RegistrationRequest): Observable<void> {
    return this.http.post<void>(apiUrl, request);
  }
}
