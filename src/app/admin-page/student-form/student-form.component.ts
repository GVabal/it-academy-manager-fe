import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomError} from '../../shared/customError';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {
  getHasStudentAddFailed,
  getHasStudentEditFailed,
  getIsStudentsLoaded,
  getIsStudentsLoading,
  getStudentById,
  getStudentEditId,
  getStudentsError
} from '../../store/students/students.selectors';
import {addStudent, editStudent} from '../../store/students/students.actions';
import {switchMap} from 'rxjs/operators';
import {Student} from '../../shared/student';
import {ProfilePictureService} from '../../service/profile-picture.service';

const namePattern = '^[a-zA-ZĄąČčĘęĖėĮįŠšŲŲūŪŽž]*$';
const occupationPattern = '^[a-zA-ZĄąČčĘęĖėĮįŠšŲųūŪŽž_-\\s]*$';
const noMultipleSpacesPattern = '(?:(?![ ]{2}).)+';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  @Input() isEditView!: boolean;
  hasAddFailed$!: Observable<boolean>;
  hasEditFailed$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  error$!: Observable<CustomError | null>;
  studentForm!: FormGroup;
  imagePreviewUrl = '';
  selectedFile: File | null = null;
  studentId$!: Observable<number>;
  studentId = 0;

  constructor(private store: Store, private fb: FormBuilder, private profilePictureService: ProfilePictureService) { }

  ngOnInit(): void {
    this.studentForm = this.initStudentForm();
    this.hasAddFailed$ = this.store.select(getHasStudentAddFailed);
    this.hasEditFailed$ = this.store.select(getHasStudentEditFailed);
    this.isLoading$ = this.store.select(getIsStudentsLoading);
    this.isLoaded$ = this.store.select(getIsStudentsLoaded);
    this.error$ = this.store.select(getStudentsError);
    this.studentId$ = this.store.select(getStudentEditId);

    if (this.isEditView) {
      this.studentId$.pipe(
        switchMap(studentId => (this.store.select(getStudentById(studentId)) as Observable<Student>))
      ).subscribe((student) => {
        if (student) {
          this.studentId = student.id || 0;
          this.studentForm.patchValue({
            firstName: student.firstName,
            lastName: student.lastName,
            occupation: student.occupation,
            direction: student.direction
          });
          this.imagePreviewUrl = student.pictureUrl as string;
          if (this.imagePreviewUrl) {
            this.profilePictureService.getProfilePictureFile(this.imagePreviewUrl)
              .subscribe(file => this.selectedFile = file);
          } else {
            this.selectedFile = null;
          }
        }
      });
    }
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
    if (this.isEditView) {
      this.store.dispatch(editStudent({id: this.studentId, student: this.studentForm.value, picture: this.selectedFile}));
    } else {
      this.store.dispatch(addStudent({student: this.studentForm.value, picture: this.selectedFile}));
    }
  }

  onFileSelect(event: any): void {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
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
