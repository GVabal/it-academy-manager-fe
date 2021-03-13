import { createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Student} from '../../shared/student';
import { addStudent, addStudentFailure, addStudentSuccess } from './students.actions';


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
  on(addStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      hasStudentAddFailed: false,
      error: null
    };
  }),
  on(addStudentSuccess, (state, action) => {
    return studentsAdapter.addOne(action.student, {
      ...state,
      loading: false,
      loaded: true,
      hasStudentAddFailed: false,
      error: null
    });
  }),
  on(addStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasStudentAddFailed: true,
      error: action.error
    };
  })
);
