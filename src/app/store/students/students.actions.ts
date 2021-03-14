import { createAction, props } from '@ngrx/store';
import {Student} from '../../shared/student';

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

export const loadStudentById = createAction(
  '[Students] Load Student',
  props<{id: string}>()
);

export const loadStudentByIdSuccess = createAction(
  '[Students] Load Student Success',
  props<{student: Student}>()
);

export const loadStudentByIdFailure = createAction(
  '[Students] Load Student Failure',
  props<{error: Error}>()
);

export const editStudent = createAction(
  '[Students] Edit Student',
  props<{student: Student}>()
);

export const editStudentSuccess = createAction(
  '[Students] Edit Student Success',
  props<{student: Student}>()
);

export const editStudentFailure = createAction(
  '[Students] Edit Student Failure',
  props<{error: Error}>()
);
