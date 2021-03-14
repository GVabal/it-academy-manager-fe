import { Student } from './../../shared/student';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addStudent = createAction(
  '[Students] Add Student',
  props<{ student: Student }>()
);

export const addStudentSuccess = createAction(
  '[Students] Add Student Success',
  props<{ student: Student }>()
);

export const addStudentFailure = createAction(
  '[Students] Add Student Failure',
  props<{ error: Error }>()
);

export const loadStudentEdit = createAction(
  '[Studetns] Load Student Edit',
  props<{ id: string }>()
);

export const editStudent = createAction(
  '[Students] Edit Student',
  props<{ student: Student, id: string }>()
);

export const editStudentSuccess = createAction(
  '[Students] Edit Student Success',
  props<{ update: Update<Student> }>()
);

export const editStudentFailure = createAction(
  '[Students] Edit Student Failure',
  props<{ error: Error }>()
);

export const editStudentDone = createAction(
  '[Studetns] Edit Student Done',
);

