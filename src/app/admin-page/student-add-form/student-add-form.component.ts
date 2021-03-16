import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {addStudent} from '../../store/students/students.actions';
import {imageUrlValidator} from '../../shared/validators/image-url.validator';
import {
  getHasStudentAddFailed,
  getIsStudentsLoaded,
  getIsStudentsLoading,
  getStudentsError
} from '../../store/students/students.selectors';
import {Observable} from 'rxjs';

const namePattern = '^[a-zA-ZĄąČčĘęĖėĮįŠšŲŲūŪŽž]*$';
const occupationPattern = '^[a-zA-ZĄąČčĘęĖėĮįŠšŲųūŪŽž_-\\s]*$';
const noMultipleSpacesPattern = '(?:(?![ ]{2}).)+';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {
  hasAddFailed$: Observable<boolean> = this.store.select(getHasStudentAddFailed);
  isLoading$: Observable<boolean> = this.store.select(getIsStudentsLoading);
  isLoaded$: Observable<boolean> = this.store.select(getIsStudentsLoaded);
  error$: Observable<Error | null> = this.store.select(getStudentsError);
  studentForm!: FormGroup;

  constructor(private store: Store,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.initStudentForm();
  }

  private initStudentForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern(namePattern)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern(namePattern)
      ]],
      pictureUrl: ['', [
        imageUrlValidator
      ]],
      occupation: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(occupationPattern),
        Validators.pattern(noMultipleSpacesPattern)
      ]],
      direction: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(occupationPattern),
        Validators.pattern(noMultipleSpacesPattern)
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
