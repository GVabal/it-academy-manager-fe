import { CustomError } from 'src/app/shared/customError';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {loginUser} from '../store/users/users.actions';
import { getUsersError } from '../store/users/users.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  error$!: Observable<CustomError | null>;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.error$ = this.store.select(getUsersError);
  }

  submitForm(): void {
    this.error$.subscribe(error => console.log(error));
    this.store.dispatch(loginUser({request: this.loginForm.value}));
  }
}
