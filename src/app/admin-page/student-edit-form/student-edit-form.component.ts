import { TestError } from './../../shared/error';
import { Student } from './../../shared/student';
import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {addStudent, loadStudentById} from '../../store/students/students.actions';
import {imageUrlValidator} from '../../shared/validators/image-url.validator';
import {
  getStudentById,
  selectHasStudentAddFailed,
  selectIsStudentsLoaded,
  selectIsStudentsLoading,
  selectStudentsError
} from '../../store/students/students.selectors';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-edit-form',
  templateUrl: './student-edit-form.component.html',
  styleUrls: ['./student-edit-form.component.scss']
})
export class StudentEditFormComponent implements OnInit {
  hasAddFailed$: Observable<boolean> = this.store.select(selectHasStudentAddFailed);
  isLoading$: Observable<boolean> = this.store.select(selectIsStudentsLoading);
  isLoaded$: Observable<boolean> = this.store.select(selectIsStudentsLoaded);
  error$: Observable<TestError| null> = this.store.select(selectStudentsError,  );
  hasAddFailed = false;
  isLoading = false;
  isLoaded = false;
  error: TestError| null = null;
  studentForm!: FormGroup;
  studentId = '';

  constructor(private store: Store,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.studentForm = this.initStudentForm();
    this.studentId = this.route.snapshot.paramMap.get('id') || '';
    (this.store.select(getStudentById(this.studentId)) as Observable<Student>).subscribe((student) => {
      if (student){
              this.studentForm.patchValue({
        firstName: student.firstName,
        lastName: student.lastName,
        pictureUrl: student.pictureUrl,
        occupation: student.occupation,
        direction: student.direction
      });
      }
    });
    this.store.dispatch(loadStudentById({id: this.studentId}));
    this.hasAddFailed$.subscribe(hasAddFailed => this.hasAddFailed = hasAddFailed);
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    this.isLoaded$.subscribe(isLoaded => this.isLoaded = isLoaded);
    this.error$.subscribe((error) => {
      this.error = error;
      if (this.error?.status === 404){
        this.router.navigate(['admin-page']);
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
    this.store.dispatch(addStudent({student: this.studentForm.value}));
  }
}
