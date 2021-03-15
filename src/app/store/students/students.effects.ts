import { Student } from './../../shared/student';
import { Update } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StudentService} from '../../service/student.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as studentActions from './students.actions';




@Injectable()
export class StudentsEffects {
  constructor(private actions$: Actions, private studentService: StudentService) { }

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.addStudent),
      switchMap((action) => this.studentService.addStudent(action.student).pipe(
        map(student => studentActions.addStudentSuccess({ student })),
        catchError(error => of(studentActions.addStudentFailure({ error })))
      )
      )
    )
  );

  editStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.editStudent),
      switchMap((action) => this.studentService.updateStudent(action.student, action.id).pipe(
        map((student) => {
          const updatedStudent: Update<Student> = {
            id: action.id,
            changes: {
              ...student,
            }
          };
          return studentActions.editStudentSuccess({ update: updatedStudent });
        }),
        catchError(error => of(studentActions.editStudentFailure({ error })))
      )
      )
    )
  );

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.loadStudents),
      mergeMap(() => this.studentService.loadStudents()
        .pipe(
          map(students => studentActions.loadStudentsSuccess({students})),
          catchError(error => of(studentActions.loadStudentsFailure({error})))
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActions.deleteStudent),
      switchMap((action) => this.studentService.deleteStudent(action.id).pipe(
          map(() => studentActions.deleteStudentSuccess({id: action.id})),
          catchError(error => of(studentActions.deleteStudentFailure({error})))
        )
      )
    )
  );
}
