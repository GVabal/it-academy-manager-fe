import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {addStudent} from '../../store/students/students.actions';
import {imageUrlValidator} from '../../shared/validators/image-url.validator';
import {selectHasStudentAddFailed, selectIsStudentsLoading, selectStudentsError} from '../../store/students/students.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {
  hasAddFailed$: Observable<boolean> = this.store.select(selectHasStudentAddFailed);
  isLoading$: Observable<boolean> = this.store.select(selectIsStudentsLoading);
  error$: Observable<Error | null> = this.store.select(selectStudentsError);
  error: Error | null = null;
  studentForm!: FormGroup;

  constructor(private store: Store,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.initStudentForm();
    this.error$.subscribe(error => this.error = error);
  }

  private initStudentForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      pictureUrl: ['', [
        imageUrlValidator
      ]],
      occupation: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      direction: ['', [
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
    this.store.dispatch(addStudent({student: this.studentForm.value}));
  }
}
