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
import { CustomError } from 'src/app/shared/customError';

const namePattern = '^[a-zA-ZĄąČčĘęĖėĮįŠšŲŲūŪŽž]*$';
const occupationPattern = '^[a-zA-ZĄąČčĘęĖėĮįŠšŲųūŪŽž_-\\s]*$';
const noMultipleSpacesPattern = '(?:(?![ ]{2}).)+';

@Component({
  selector: 'app-student-add-form',
  templateUrl: './student-add-form.component.html',
  styleUrls: ['./student-add-form.component.scss']
})
export class StudentAddFormComponent implements OnInit {
  hasAddFailed$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  error$!: Observable<CustomError | null>;
  studentForm!: FormGroup;
  imagePreviewUrl = '';
  selectedFile: File | null = null;

  constructor(private store: Store,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.initStudentForm();
    this.hasAddFailed$ = this.store.select(getHasStudentAddFailed);
    this.isLoading$ = this.store.select(getIsStudentsLoading);
    this.isLoaded$ = this.store.select(getIsStudentsLoaded);
    this.error$ = this.store.select(getStudentsError);
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
      occupation: ['', [
        Validators.maxLength(50),
        Validators.pattern(occupationPattern),
        Validators.pattern(noMultipleSpacesPattern)
      ]],
      direction: ['', [
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

  get occupation(): FormControl {
    return this.studentForm.get('occupation') as FormControl;
  }

  get direction(): FormControl {
    return this.studentForm.get('direction') as FormControl;
  }

  submitForm(): void {
    this.store.dispatch(addStudent({student: this.studentForm.value, picture: this.selectedFile}));
  }

  onPictureChange(event: any): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
      reader.readAsDataURL(this.selectedFile as File);
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
    }
  }

  clearSelectedImage(): void {
    this.imagePreviewUrl = '';
    this.selectedFile = null;
  }
}
