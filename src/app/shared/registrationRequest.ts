import {UserRole} from './userRole';

export interface RegistrationRequest {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}
