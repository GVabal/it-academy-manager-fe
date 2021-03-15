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

export const loadStudents = createAction(
  '[Students] Load Students'
);

export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{students: Student[]}>()
);

export const loadStudentsFailure = createAction(
  '[Students] Load Student Failure',
  props<{error: Error}>()
);

export const deleteStudent = createAction(
  '[Student] Delete Student',
  props<{id: number}>()
);

export const deleteStudentSuccess = createAction(
  '[Student] Delete Student Success',
  props<{id: number}>()
);

export const deleteStudentFailure = createAction(
  '[Student] Delete Student Failure',
  props<{error: Error}>()
);
