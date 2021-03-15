import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Student } from '../../shared/student';
import * as studentActions from './students.actions';


export const studentsFeatureKey = 'students';

export interface StudentsState extends EntityState<Student> {

  loading: boolean;
  loaded: boolean;
  hasStudentAddFailed: boolean;
  hasStudentEditFailed: boolean;
  hasStudentLoadFailed: boolean;
  hasStudentDeleteFailed: boolean;
  error: Error | null;
  studentEditId: number;
  editOrCreateForm: boolean;
}

export const studentsAdapter = createEntityAdapter<Student>();

export const initialState: StudentsState = studentsAdapter.getInitialState({
  loading: false,
  loaded: false,
  hasStudentAddFailed: false,
  hasStudentEditFailed: false,
  error: null,
  studentEditId: -1,
  hasStudentLoadFailed: false,
  editOrCreateForm: false,
  hasStudentDeleteFailed: false,
});


export const studentsReducer = createReducer(
  initialState,
  on(studentActions.addStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      hasStudentAddFailed: false,
      error: null
    };
  }),
  on(studentActions.addStudentSuccess, (state, action) => {
    return studentsAdapter.addOne(action.student, {
      ...state,
      loading: false,
      loaded: true,
      hasStudentAddFailed: false,
      error: null
    });
  }),
  on(studentActions.addStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasStudentAddFailed: true,
      error: action.error
    };
  }),

  on(studentActions.loadStudentEdit, (state, action) => {
    return {
      ...state,
      studentEditId: action.id,
      editOrCreateForm: true
    };
  }),

  on(studentActions.loadStudentCreate, (state, action) => {
    return {
      ...state,
      editOrCreateForm: false
    };
  }),

  on(studentActions.editStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      hasStudentEditFailed: false,
      error: null
    };
  }),

  on(studentActions.editStudentSuccess, (state, action) => {
    return studentsAdapter.updateOne(action.update, {
      ...state,
      loading: false,
      loaded: true,
      hasStudentEditFailed: false,
      error: null
    });
  }),
  on(studentActions.editStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasStudentEditFailed: true,
      error: action.error
    };
  }),
  on(studentActions.editStudentDone, (state) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasStudentEditFailed: false,
      error: null,
      studentEditId: -1,
    };
  }),

on(studentActions.loadStudents, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }),
  on(studentActions.loadStudentsSuccess, (state, action) => {
    return studentsAdapter.addMany(action.students, {
      ...state,
      loading: false,
      loaded: true,
      error: null
    });
  }),
  on(studentActions.loadStudentsFailure, (state, action) => {
    return{
      ...state,
      loading: false,
      loaded: false,
      hasStudentLoadFailed: true,
      error: action.error
    };
  }),
  on(studentActions.deleteStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }),
  on(studentActions.deleteStudentSuccess, (state, action) => {
    return studentsAdapter.removeOne(action.id, {
      ...state,
      loading: false,
      loaded: true,
      error: null
    });
  }),
  on(studentActions.deleteStudentFailure, (state, action) => {
    return{
      ...state,
      loading: false,
      loaded: false,
      hasStudentDeleteFailed: true,
      error: action.error
    };
  })
);
