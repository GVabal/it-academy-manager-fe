import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { StudentService } from '../../service/student.service';
import { Student } from '../../shared/student';
import { loadStudents } from '../../store/students/students.actions';
import { selectHasStudentLoadFailed, selectIsStudentsLoaded, selectIsStudentsLoading, selectStudents, selectStudentsError } from '../../store/students/students.selectors';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]> | undefined;

  isStudentsLoading$: Observable<boolean> =  this.store.select(selectIsStudentsLoading);
  isStudentsLoaded$: Observable<boolean> = this.store.select(selectIsStudentsLoaded);
  hasLoadFailed$: Observable<boolean> = this.store.select(selectHasStudentLoadFailed);
  error$: Observable<Error | null> = this.store.select(selectStudentsError);

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.store.dispatch(loadStudents());

    combineLatest([this.isStudentsLoading$, this.isStudentsLoaded$]).pipe(
      filter(([loading, loaded]) => !loading && !loaded),
      take(1),
      tap(() => {
        this.store.dispatch(loadStudents());
      })
    ).subscribe();

    this.students$ = this.store.select(selectStudents);
  }
}
