import { createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Student} from '../../shared/student';
import * as studentActions from './students.actions';
//import { addStudent, addStudentFailure, addStudentSuccess, loadStudentById, loadStudentByIdSuccess, loadStudentByIdFailure} from './students.actions';


export const studentsFeatureKey = 'students';

export interface StudentsState extends EntityState<Student>{
  loading: boolean;
  loaded: boolean;
  hasStudentAddFailed: boolean;
  error: Error | null;
}

export const studentsAdapter = createEntityAdapter<Student>();

export const initialState: StudentsState = studentsAdapter.getInitialState({
  loading: false,
  loaded: false,
  hasStudentAddFailed: false,
  error: null
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
  on(studentActions.loadStudentById, (state) => {
    return {
      ...state
    };
  })
  ,
  on(studentActions.loadStudentByIdSuccess, (state, action) => {
    return studentsAdapter.upsertOne(action.student,{ 
      ...state
    });
  }),
  on(studentActions.loadStudentByIdFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),  on(studentActions.editStudent, (state) => {
    return {
      ...state,
    };
  }),
  on(studentActions.editStudentSuccess, (state, action) => {
    return studentsAdapter.addOne(action.student, {
      ...state,
    });
  }),
  on(studentActions.editStudentFailure, (state, action) => {
    return {
      ...state,
    };
  })
);
