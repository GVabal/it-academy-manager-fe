import { editStudent } from '../../store/students/students.actions';
import { switchMap } from 'rxjs/operators';
import { Student } from '../../shared/student';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { imageUrlValidator } from '../../shared/validators/image-url.validator';
import {
  getStudentEditId,
  getHasStudentEditFailed,
  getStudentById,
  getIsStudentsLoaded,
  getIsStudentsLoading,
  getStudentsError,
} from '../../store/students/students.selectors';
import { Observable } from 'rxjs';
import { CustomError } from 'src/app/shared/customError';

@Component({
  selector: 'app-student-edit-form',
  templateUrl: './student-edit-form.component.html',
  styleUrls: ['./student-edit-form.component.scss']
})
export class StudentEditFormComponent implements OnInit {

  hasEditFailed$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  error$!: Observable<CustomError | null>;
  studentId$!: Observable<number>;

  studentForm!: FormGroup;
  studentId = 0;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.hasEditFailed$ = this.store.select(getHasStudentEditFailed);
    this.isLoading$ = this.store.select(getIsStudentsLoading);
    this.isLoaded$ = this.store.select(getIsStudentsLoaded);
    this.error$ = this.store.select(getStudentsError);
    this.studentId$ = this.store.select(getStudentEditId);
    this.studentForm = this.initStudentForm();
    this.studentId$.pipe(
      switchMap(studentId => (this.store.select(getStudentById(studentId)) as Observable<Student>))
    ).subscribe((student) => {
      if (student) {
        this.studentId = student.id || 0;
        this.studentForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          pictureUrl: student.pictureUrl,
          occupation: student.occupation,
          direction: student.direction
        });
      }
    });
  }

  private initStudentForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(25)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(25)
      ]],
      pictureUrl: ['', [
        imageUrlValidator
      ]],
      occupation: ['', [
        Validators.maxLength(50)
      ]],
      direction: ['', [
        Validators.maxLength(50)
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
    this.store.dispatch(editStudent({ id: this.studentId, student: this.studentForm.value }));
  }
}
