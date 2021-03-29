import { Student } from '../../shared/student';
import { Update } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StudentService} from '../../service/student.service';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { addStudent, addStudentFailure, addStudentSuccess, changeSelectedStudent, deleteStudent, deleteStudentFailure,
  deleteStudentSuccess, editStudent, editStudentFailure, editStudentSuccess, loadStudents,
  loadStudentsFailure, loadStudentsSuccess } from './students.actions';
import { loadReviews } from '../review/review.action';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class StudentsEffects {
  constructor(private actions$: Actions,
              private studentService: StudentService,
              private toastr: ToastrService) { }

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStudent),
      switchMap((action) => this.studentService.addStudent(action.student, action.picture).pipe(
        map(student => {
          this.toastr.success('Student added.', 'Success!');
          return addStudentSuccess({ student });
        }),
        catchError(error => of(addStudentFailure({ error })))
      )
      )
    )
  );

  editStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editStudent),
      switchMap((action) => this.studentService.updateStudent(action.student, action.id, action.picture).pipe(
        map((student) => {
          const updatedStudent: Update<Student> = {
            id: action.id,
            changes: {
              ...student,
            }
          };
          this.toastr.success('Changes were saved.', 'Success!');
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
          map(() => {
            this.toastr.info('Student deleted.', 'Success!');
            return deleteStudentSuccess({id: action.id});
          }),
          catchError(error => of(deleteStudentFailure({error}))),
        )
      )
    )
  );

  selectStudentChange$: Observable<{}> = createEffect(() =>
  this.actions$.pipe(
    ofType(changeSelectedStudent),
    map(({id}) => loadReviews({id}))
  )
);
}
