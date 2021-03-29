import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CustomError} from '../../shared/customError';
import {UserRole} from '../../shared/userRole';
import {Store} from '@ngrx/store';
import {registerUser} from '../../store/users/users.actions';
import {getHasUserRegistrationFailed, getIsUsersLoaded, getIsUsersLoading, getUsersError} from '../../store/users/users.selectors';
import { MatDialogRef } from '@angular/material/dialog';

const namePattern = /^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽžÄäÅåÖö \-.']*$/;

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  roles: UserRole[] = [UserRole.MANAGER, UserRole.LECTURER];
  hasRegistrationFailed$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  error$!: Observable<CustomError | null>;
  registrationForm!: FormGroup;

  constructor(private store: Store,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<UserRegistrationFormComponent>) { }

  ngOnInit(): void {
    this.registrationForm = this.initRegistrationForm();
    this.hasRegistrationFailed$ = this.store.select(getHasUserRegistrationFailed);
    this.isLoading$ = this.store.select(getIsUsersLoading);
    this.isLoaded$ = this.store.select(getIsUsersLoaded);
    this.error$ = this.store.select(getUsersError);
  }

  private initRegistrationForm(): FormGroup {
     return this.fb.group({
      fullName: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(namePattern)
      ]],
      email: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]],
      repeatPassword: [''],
      role: [null, Validators.required]
    });
  }

  get fullName(): FormControl {
    return this.registrationForm.get('fullName') as FormControl;
  }

  get email(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.registrationForm.get('repeatPassword') as FormControl;
  }

  get role(): FormControl {
    return this.registrationForm.get('role') as FormControl;
  }

  submitForm(): void {
    this.store.dispatch(registerUser({request: this.registrationForm.value}));
  }

  onPasswordChange(): void {
    if (this.repeatPassword.value === this.password.value) {
      this.repeatPassword.setErrors(null);
    } else {
      this.repeatPassword.setErrors({ matchPasswords: true });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
