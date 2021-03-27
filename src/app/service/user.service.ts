import {Injectable} from '@angular/core';
import {RegistrationRequest} from '../shared/registrationRequest';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginRequest} from '../shared/loginRequest';
import {User} from '../shared/user';
import {UserRole} from '../shared/userRole';

const apiUrl = `${environment.baseUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return document.cookie.substring(6);
  }

  registerUser(request: RegistrationRequest): Observable<void> {
    return this.http.post<void>(`${apiUrl}/users`, request);
  }

  login(request: LoginRequest): Observable<User> {
    // return this.http.post<User>(`${apiUrl}/login`, request);
    const mockUser: User = {fullName: 'temp user', role: UserRole.ADMIN, token: 'temp token'};
    return of(mockUser);
  }
}
