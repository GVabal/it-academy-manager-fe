import { createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Student} from '../../shared/Student';
import { addStudent, addStudentFailure, addStudentSuccess } from './students.actions';


export const studentsFeatureKey = 'students';

export interface StudentsState extends EntityState<Student>{
  loading: boolean;
  loaded: boolean;
}

export const studentsAdapter = createEntityAdapter<Student>();

export const initialState: StudentsState = studentsAdapter.getInitialState({
  loading: false,
  loaded: false
});


export const studentsReducer = createReducer(
  initialState,
  on(addStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),
  on(addStudentSuccess, (state, action) => {
    return studentsAdapter.addOne(action.student, {
      ...state,
      loading: false,
      loaded: true
    });
  }),
  on(addStudentFailure, (state) => {
    return {
      ...state,
      loading: false,
      loaded: true
    };
  })
);
