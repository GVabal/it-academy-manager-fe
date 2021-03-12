import { createAction, props } from '@ngrx/store';
import {Student} from '../../shared/Student';

export const addStudent = createAction(
  '[Students] Add Student',
  props<{student: Student}>()
);

export const addStudentSuccess = createAction(
  '[Students] Add Student Success',
  props<{student: Student}>()
);

export const addStudentFailure = createAction(
  '[Students] Add Student Failure',
  props<{error: Error}>()
);
