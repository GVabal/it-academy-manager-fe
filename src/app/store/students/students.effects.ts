import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {StudentService} from '../../service/student.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {addStudent, addStudentFailure, addStudentSuccess} from './students.actions';
import {Student} from '../../shared/Student';



@Injectable()
export class StudentsEffects {
  constructor(private actions$: Actions,
              private studentService: StudentService) {}

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addStudent),
      switchMap((action) => {
        console.log('action: ', action);
        console.log('action.student: ', action.student);
        return this.studentService.addStudent(action as unknown as Student).pipe(
          map(student => {
            return addStudentSuccess({student});
          }),
          catchError(error => of(addStudentFailure({error})))
          );
        }
      )
    )
  );
}
