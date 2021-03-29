import { Student } from './../../shared/student';
import { getReviewData } from '../../store/review/review.selectors';
import { ReviewData } from '../../shared/reviewData';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { getSelectedStudentId, getStudentById } from 'src/app/store/students/students.selectors';
import { Stream } from 'src/app/shared/stream';
import { selectStreams } from 'src/app/store/stream/stream.selectors';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {
  student$!: Observable<Student>;
  streams$!: Observable<Stream[]>;
  streamId = 0;
  reviewsData$!: Observable<ReviewData>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.student$ = this.store.pipe(
      select(getSelectedStudentId),
      switchMap(studentId => (this.store.select(getStudentById(studentId)) as Observable<Student>)));
    this.reviewsData$ = this.store.select(getReviewData(this.streamId));
    this.streams$ = this.store.select(selectStreams);
  }

  onSelect(): void{
    this.reviewsData$ = this.store.select(getReviewData(this.streamId));
  }
}
