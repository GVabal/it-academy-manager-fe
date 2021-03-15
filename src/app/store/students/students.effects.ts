import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StudentService} from '../../service/student.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {addStudent, addStudentFailure, addStudentSuccess, loadStudents, loadStudentsFailure, loadStudentsSuccess} from './students.actions';


@Injectable()
export class StudentsEffects {
  constructor(private actions$: Actions,
              private studentService: StudentService) {}

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStudent),
      switchMap((action) => this.studentService.addStudent(action.student).pipe(
          map(student => addStudentSuccess({student})),
          catchError(error => of(addStudentFailure({error})))
        )
      )
    )
  );

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStudents),
      mergeMap(() => this.studentService.loadStudents()
        .pipe(
          map(students => loadStudentsSuccess({students})),
          catchError(error => of(loadStudentsFailure({error})))
        )
      )
    )
  );
}
