import { Student } from '../../shared/student';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { CustomError } from 'src/app/shared/customError';

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
  props<{ error: CustomError}>()
);

export const loadStudentEdit = createAction(
  '[Students] Load Student Edit Form',
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
  props<{ error: CustomError}>()
);

export const loadStudents = createAction(
  '[Students] Load Students'
);

export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{students: Student[]}>()
);

export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{error: CustomError}>()
);

export const deleteStudent = createAction(
  '[Students] Delete Student',
  props<{id: number}>()
);

export const deleteStudentSuccess = createAction(
  '[Students] Delete Student Success',
  props<{id: number}>()
);

export const deleteStudentFailure = createAction(
  '[Students] Delete Student Failure',
  props<{error: CustomError}>()
);
