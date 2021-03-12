import { createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Student} from '../../shared/Student';
import { addStudent, addStudentFailure, addStudentSuccess } from './students.actions';


export const studentsFeatureKey = 'students';

export interface StudentsState extends EntityState<Student>{
  loading: boolean;
  loaded: boolean;
  hasAddFailed: boolean;
  error: Error | null;
}

export const studentsAdapter = createEntityAdapter<Student>();

export const initialState: StudentsState = studentsAdapter.getInitialState({
  loading: false,
  loaded: false,
  hasAddFailed: false,
  error: null
});


export const studentsReducer = createReducer(
  initialState,
  on(addStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      hasAddFailed: false,
      error: null
    };
  }),
  on(addStudentSuccess, (state, action) => {
    return studentsAdapter.addOne(action.student, {
      ...state,
      loading: false,
      loaded: true,
      hasAddFailed: false,
      error: null
    });
  }),
  on(addStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasAddFailed: true,
      error: action.error
    };
  })
);
