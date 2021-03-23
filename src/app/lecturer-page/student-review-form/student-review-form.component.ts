import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomError } from 'src/app/shared/customError';
import { Stream } from 'src/app/shared/stream';
import { Student } from 'src/app/shared/student';
import { addReview } from 'src/app/store/review/review.action';
import { getHasReviewAddFailed, getIsReviewsLoaded, getIsReviewsLoading } from 'src/app/store/review/review.selectors';
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
  selectedStudentImg: string = './assets/no-profile-picture.png';

  public communicationCharsRemaining$: Observable<number> | undefined;
  public abilityToLearnCharsRemaining$: Observable<number> | undefined;
  public extraMileCharsRemaining$: Observable<number> | undefined;
  public motivationCharsRemaining$: Observable<number> | undefined;
  public directionCharsRemaining$: Observable<number> | undefined;
  public overallCharsRemaining$: Observable<number> | undefined;

  showErrors = false;
  showSuccess = false;

  constructor(private fb: FormBuilder,
              private store: Store) { }

  ngOnInit(): void {
    this.reviewForm = this.initReviewForm();
    this.students$ = this.store.select(selectStudents);
    this.streams$ = this.store.select(selectStreams);

    this.hasAddReviewFailed$ = this.store.select(getHasReviewAddFailed);
    this.isLoading$ = this.store.select(getIsReviewsLoading);
    this.isLoaded$ = this.store.select(getIsReviewsLoaded);

    this.studentId.valueChanges.pipe(
      switchMap(id => (this.store.select(getStudentById(id)) as Observable<Student>))
    ).subscribe((student) => {
        this.selectedStudentImg = student.pictureUrl as string;
    });
    
    this.initRemainingChars();
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
      directionComment: ['', [
        Validators.maxLength(this.maxChars),
      ]],
      directionGrade: this.defaultSliderValue,
      overallComment: ['', [
        Validators.maxLength(this.maxChars),
        Validators.required,
      ]],
      overallGrade: this.defaultSliderValue
    });
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

  get directionComment(): FormControl {
    return this.reviewForm.get('directionComment') as FormControl;
  }

  get directionGrade(): FormControl {
    return this.reviewForm.get('directionGrade') as FormControl;
  }

  get overallComment(): FormControl {
    return this.reviewForm.get('overallComment') as FormControl;
  }

  get overallGrade(): FormControl {
    return this.reviewForm.get('overallGrade') as FormControl;
  }

  submitForm(): void{
    if (this.reviewForm.valid){
      this.store.dispatch(addReview({review: this.reviewForm.value}));
      this.showSuccess = true;
      this.showErrors = false;
    }
    else{
      this.showErrors = true;
      this.showSuccess = false;
    }
  }

  private initRemainingChars(): void{
    this.communicationCharsRemaining$ = concat(of(''), this.communicationComment.valueChanges).pipe(
      map((communicationComment) => {
        this.showSuccess = false;
        return communicationComment?.length || 0;
      })
    );

    this.abilityToLearnCharsRemaining$ = concat(of(''), this.abilityToLearnComment.valueChanges).pipe(
      map((abilityToLearnComment) => {
        this.showSuccess = false;
        return abilityToLearnComment?.length || 0;
      })
    );

    this.extraMileCharsRemaining$ = concat(of(''), this.extraMileComment.valueChanges).pipe(
      map((extraMileComment) => {
        this.showSuccess = false;
        return extraMileComment?.length || 0;
      })
    );

    this.motivationCharsRemaining$ = concat(of(''), this.motivationComment.valueChanges).pipe(
      map((motivationComment) => {
        this.showSuccess = false;
        return motivationComment?.length || 0;
      })
    );

    this.overallCharsRemaining$ = concat(of(''), this.overallComment.valueChanges).pipe(
      map((overallComment) => {
        this.showSuccess = false;
        return overallComment?.length || 0;
      })
    );
    this.directionCharsRemaining$ = concat(of(''), this.directionComment.valueChanges).pipe(
      map((directionComment) => {
        this.showSuccess = false;
        return directionComment?.length || 0;
      })
    );
  }
}
