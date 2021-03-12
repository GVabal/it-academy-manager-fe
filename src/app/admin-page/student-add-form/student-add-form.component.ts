import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {addStudent} from '../../store/students/students.actions';
import {selectIsStudentsLoading} from '../../store/students/students.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select(selectIsStudentsLoading);
  isLoading = false;
  studentForm!: FormGroup;

  constructor(private store: Store,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.initStudentForm();
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  private initStudentForm(): FormGroup {
    return this.fb.group({
      firstName: ['John', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      lastName: ['Tron', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      pictureUrl: ['https://www.google.com/image.png', [
        Validators.pattern(/(^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png|bmp)$)/)
      ]],
      occupation: ['Homeless', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      direction: ['QA', [
        Validators.required,
        Validators.maxLength(255)
      ]]
    });
  }

  get firstName(): FormControl {
    return this.studentForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.studentForm.get('lastName') as FormControl;
  }

  get pictureUrl(): FormControl {
    return this.studentForm.get('pictureUrl') as FormControl;
  }

  get occupation(): FormControl {
    return this.studentForm.get('occupation') as FormControl;
  }

  get direction(): FormControl {
    return this.studentForm.get('direction') as FormControl;
  }

  submitForm(): void {
    this.store.dispatch(addStudent(this.studentForm.value));
  }
}
