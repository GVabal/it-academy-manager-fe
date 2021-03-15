import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Student } from '../../shared/student';
import { addStudent, addStudentFailure, addStudentSuccess, deleteStudent, deleteStudentFailure,
   deleteStudentSuccess, editStudent, editStudentFailure, editStudentSuccess, loadStudentCreate,
   loadStudentEdit, loadStudents, loadStudentsFailure, loadStudentsSuccess } from './students.actions';



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
      hasStudentAddFailed: false
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
  }),

  on(loadStudentEdit, (state, action) => {
    return {
      ...state,
      studentEditId: action.id,
      editOrCreateForm: true
    };
  }),

  on(loadStudentCreate, (state) => {
    return {
      ...state,
      editOrCreateForm: false
    };
  }),

  on(editStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      hasStudentEditFailed: false,
      error: null
    };
  }),

  on(editStudentSuccess, (state, action) => {
    return studentsAdapter.updateOne(action.update, {
      ...state,
      loading: false,
      loaded: true,
      hasStudentEditFailed: false
    });
  }),

  on(editStudentFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      hasStudentEditFailed: true,
      error: action.error
    };
  }),

  on(loadStudents, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null
    };
  }),

  on(loadStudentsSuccess, (state, action) => {
    return studentsAdapter.addMany(action.students, {
      ...state,
      loading: false,
      loaded: true,
      error: null
    });
  }),

  on(loadStudentsFailure, (state, action) => {
    return{
      ...state,
      loading: false,
      loaded: false,
      hasStudentLoadFailed: true,
      error: action.error
    };
  }),

  on(deleteStudent, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),

  on(deleteStudentSuccess, (state, action) => {
    return studentsAdapter.removeOne(action.id, {
      ...state,
      loading: false,
      loaded: true
    });
  }),

  on(deleteStudentFailure, (state, action) => {
    return{
      ...state,
      loading: false,
      loaded: false,
      hasStudentDeleteFailed: true,
      error: action.error
    };
  })
);
