import { Student } from './../../shared/student';
import { Update } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StudentService} from '../../service/student.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { addStudent, addStudentFailure, addStudentSuccess, deleteStudent, deleteStudentFailure,
  deleteStudentSuccess, editStudent, editStudentFailure, editStudentSuccess, loadStudents,
  loadStudentsFailure, loadStudentsSuccess } from './students.actions';


@Injectable()
export class StudentsEffects {
  constructor(private actions$: Actions, private studentService: StudentService) { }

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStudent),
      switchMap((action) => this.studentService.addStudent(action.student, action.picture).pipe(
        map(student => addStudentSuccess({ student })),
        catchError(error => of(addStudentFailure({ error })))
      )
      )
    )
  );

  editStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editStudent),
      switchMap((action) => this.studentService.updateStudent(action.student, action.id).pipe(
        map((student) => {
          const updatedStudent: Update<Student> = {
            id: action.id,
            changes: {
              ...student,
            }
          };
          return editStudentSuccess({ update: updatedStudent });
        }),
        catchError(error => of(editStudentFailure({ error })))
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

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStudent),
      switchMap((action) => this.studentService.deleteStudent(action.id).pipe(
          map(() => deleteStudentSuccess({id: action.id})),
          catchError(error => of(deleteStudentFailure({error})))
        )
      )
    )
  );
}
