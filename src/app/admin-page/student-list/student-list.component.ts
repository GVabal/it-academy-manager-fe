import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../shared/student';
import { getHasStudentLoadFailed, selectIsStudentsLoaded, selectIsStudentsLoading, selectStudents, selectStudentsError } from '../../store/students/students.selectors';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]> | undefined;

  isStudentsLoading$: Observable<boolean> | undefined;
  isStudentsLoaded$: Observable<boolean> | undefined ;
  hasLoadFailed$: Observable<boolean> | undefined ;
  error$: Observable<Error | null> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.isStudentsLoading$ =  this.store.select(selectIsStudentsLoading);
    this.isStudentsLoaded$ = this.store.select(selectIsStudentsLoaded);
    this.hasLoadFailed$ = this.store.select(getHasStudentLoadFailed);
    this.error$ = this.store.select(selectStudentsError);
    this.students$ = this.store.select(selectStudents);
  }
}
