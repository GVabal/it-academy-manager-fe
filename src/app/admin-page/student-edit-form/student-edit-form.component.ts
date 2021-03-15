import { editStudent } from './../../store/students/students.actions';
import { switchMap } from 'rxjs/operators';
import { Student } from './../../shared/student';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { imageUrlValidator } from '../../shared/validators/image-url.validator';
import {
  selectSudentEditId,
  selectHasStudentEditFailed,
  getStudentById,
  selectIsStudentsLoaded,
  selectIsStudentsLoading,
  selectStudentsError,
} from '../../store/students/students.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-edit-form',
  templateUrl: './student-edit-form.component.html',
  styleUrls: ['./student-edit-form.component.scss']
})
export class StudentEditFormComponent implements OnInit {

  hasEditFailed$: Observable<boolean> = this.store.select(selectHasStudentEditFailed);
  isLoading$: Observable<boolean> = this.store.select(selectIsStudentsLoading);
  isLoaded$: Observable<boolean> = this.store.select(selectIsStudentsLoaded);
  error$: Observable<Error | null> = this.store.select(selectStudentsError);
  studentId$: Observable<number> = this.store.select(selectSudentEditId);

  studentForm!: FormGroup;
  studentId = 0;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
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
    this.store.dispatch(editStudent({ id: this.studentId, student: this.studentForm.value }));
  }
}
