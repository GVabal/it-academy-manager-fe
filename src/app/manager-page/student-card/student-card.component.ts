import { getReviewData } from '../../store/review/review.selectors';
import { ReviewData } from '../../shared/reviewData';
import { Store } from '@ngrx/store';
import { Student } from '../../shared/student';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { getSelectedStudentId, getStudentById } from 'src/app/store/students/students.selectors';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {

  studentId$!: Observable<number>;
  student!: Student;
  reviewsData$!: Observable<ReviewData>;
  reviewData = {} as ReviewData;
  averages = [{data: [0, 0, 0, 0, 0]}];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.studentId$ = this.store.select(getSelectedStudentId);
    this.studentId$.pipe(
      switchMap(studentId => (this.store.select(getStudentById(studentId)) as Observable<Student>))
    ).subscribe((student) => {
      if (student) {
        this.student = student;
    }});

    this.reviewsData$ = this.store.select(getReviewData);
    this.reviewsData$.subscribe(data => {
      this.reviewData = data;
      this.averages = [{data: [this.average(data.overallGrade), this.average(data.abilityToLearnGrade),
        this.average(data.motivationGrade), this.average(data.extraMileGrade), this.average(data.communicationGrade)]}];
    });
  }

  average(list: number[]): number{
    let sum = 0;
    for (const item of list ){
      sum += item;
    }
    const avg = sum / list.length;
    return Number(avg.toFixed(2));
  }
}
