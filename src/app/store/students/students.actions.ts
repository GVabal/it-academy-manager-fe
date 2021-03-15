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
  '[Students] Load Student Edit From',
  props<{ id: number }>()
);

export const loadStudentCreate = createAction(
  '[Students] Load Student Create Form',
);

export const editStudent = createAction(
  '[Students] Edit Student',
  props<{ student: Student, id: number }>()
);

export const editStudentSuccess = createAction(
  '[Students] Edit Student Success',
  props<{ update: Update<Student> }>()
);

export const editStudentFailure = createAction(
  '[Students] Edit Student Failure',
  props<{ error: Error }>()
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
