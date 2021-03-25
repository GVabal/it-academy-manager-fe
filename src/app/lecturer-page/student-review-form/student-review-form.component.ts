import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomError } from 'src/app/shared/customError';
import { Stream } from 'src/app/shared/stream';
import { Student } from 'src/app/shared/student';
import { addReview } from 'src/app/store/review/review.action';
import {
  getClearForm,
  getHasReviewAddFailed,
  getIsReviewsLoaded,
  getIsReviewsLoading,
  getReviewsError
} from 'src/app/store/review/review.selectors';
import { selectStreams } from 'src/app/store/stream/stream.selectors';
import { getStudentById, selectStudents } from 'src/app/store/students/students.selectors';

@Component({
  selector: 'app-student-review-form',
  templateUrl: './student-review-form.component.html',
  styleUrls: ['./student-review-form.component.scss']
})
export class StudentReviewFormComponent implements OnInit {

  public readonly defaultSliderValue = 5;
  public readonly maxChars = 255;

  reviewForm!: FormGroup;
  hasAddReviewFailed$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  isLoaded$!: Observable<boolean>;
  error$!: Observable<CustomError | null>;
  students$!: Observable<Student[]>;
  streams$!: Observable<Stream[]>;
  clearForm$!: Observable<boolean>;
  selectedStudentImg = '';

  communicationCharsRemaining$: Observable<number> | undefined;
  abilityToLearnCharsRemaining$: Observable<number> | undefined;
  extraMileCharsRemaining$: Observable<number> | undefined;
  motivationCharsRemaining$: Observable<number> | undefined;
  overallCharsRemaining$: Observable<number> | undefined;

  constructor(private fb: FormBuilder,
              private store: Store) { }

  ngOnInit(): void {
    this.reviewForm = this.initReviewForm();
    this.students$ = this.store.select(selectStudents);
    this.streams$ = this.store.select(selectStreams);
    this.error$ = this.store.select(getReviewsError);
    this.hasAddReviewFailed$ = this.store.select(getHasReviewAddFailed);
    this.isLoading$ = this.store.select(getIsReviewsLoading);
    this.isLoaded$ = this.store.select(getIsReviewsLoaded);
    this.clearForm$ = this.store.select(getClearForm);

    this.initRemainingChars();

    this.studentId.valueChanges.pipe(
      switchMap(id => (this.store.select(getStudentById(id)) as Observable<Student>))
    ).subscribe((student) => {
      if (student) {
        this.selectedStudentImg = student.pictureUrl as string;
      } else {
        this.selectedStudentImg = '';
      }
    });

    this.clearForm$.subscribe((clearForm) => {
      if (clearForm) {
        this.reviewForm.reset();
        this.setAllGrades(this.defaultSliderValue);
      }
    });
  }

  private initReviewForm(): FormGroup {
    return this.fb.group({
      studentId: [null, [Validators.required]],
      streamId: [null, [Validators.required]],
      communicationComment: ['', [
        Validators.maxLength(this.maxChars),
      ]],
      communicationGrade: this.defaultSliderValue,
      abilityToLearnComment: ['', [
        Validators.maxLength(this.maxChars),
      ]],
      abilityToLearnGrade: this.defaultSliderValue,
      extraMileComment: ['', [
        Validators.maxLength(this.maxChars),
      ]],
      extraMileGrade: this.defaultSliderValue,
      motivationComment: ['', [
        Validators.maxLength(this.maxChars),
      ]],
      motivationGrade: this.defaultSliderValue,
      overallComment: ['', [
        Validators.maxLength(this.maxChars),
        Validators.required,
      ]],
      overallGrade: this.defaultSliderValue
    });
  }

  private setAllGrades(grade: number): void {
    this.communicationGrade.setValue(grade);
    this.abilityToLearnGrade.setValue(grade);
    this.extraMileGrade.setValue(grade);
    this.motivationGrade.setValue(grade);
    this.overallGrade.setValue(grade);
  }

  get studentId(): FormControl {
    return  this.reviewForm.get('studentId') as FormControl;
  }

  get streamId(): FormControl {
    return this.reviewForm.get('streamId') as FormControl;
  }

  get communicationComment(): FormControl {
    return this.reviewForm.get('communicationComment') as FormControl;
  }

  get communicationGrade(): FormControl {
    return this.reviewForm.get('communicationGrade') as FormControl;
  }

  get abilityToLearnComment(): FormControl {
    return this.reviewForm.get('abilityToLearnComment') as FormControl;
  }

  get abilityToLearnGrade(): FormControl {
    return this.reviewForm.get('abilityToLearnGrade') as FormControl;
  }

  get extraMileComment(): FormControl {
    return this.reviewForm.get('extraMileComment') as FormControl;
  }

  get extraMileGrade(): FormControl {
    return this.reviewForm.get('extraMileGrade') as FormControl;
  }

  get motivationComment(): FormControl {
    return this.reviewForm.get('motivationComment') as FormControl;
  }

  get motivationGrade(): FormControl {
    return this.reviewForm.get('motivationGrade') as FormControl;
  }

  get overallComment(): FormControl {
    return this.reviewForm.get('overallComment') as FormControl;
  }

  get overallGrade(): FormControl {
    return this.reviewForm.get('overallGrade') as FormControl;
  }

  submitForm(): void{
    this.store.dispatch(addReview({review: this.reviewForm.value}));
  }

  private initRemainingChars(): void{
    this.communicationCharsRemaining$ = concat(of(''), this.communicationComment.valueChanges).pipe(
      map((communicationComment) => {
        return communicationComment?.length || 0;
      })
    );

    this.abilityToLearnCharsRemaining$ = concat(of(''), this.abilityToLearnComment.valueChanges).pipe(
      map((abilityToLearnComment) => {
        return abilityToLearnComment?.length || 0;
      })
    );

    this.extraMileCharsRemaining$ = concat(of(''), this.extraMileComment.valueChanges).pipe(
      map((extraMileComment) => {
        return extraMileComment?.length || 0;
      })
    );

    this.motivationCharsRemaining$ = concat(of(''), this.motivationComment.valueChanges).pipe(
      map((motivationComment) => {
        return motivationComment?.length || 0;
      })
    );

    this.overallCharsRemaining$ = concat(of(''), this.overallComment.valueChanges).pipe(
      map((overallComment) => {
        return overallComment?.length || 0;
      })
    );
  }
}
