import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Student } from '../../shared/student';
import { addStudent, addStudentFailure, addStudentSuccess, changeSelectedStudent, deleteStudent, deleteStudentFailure,
   deleteStudentSuccess, editStudent, editStudentFailure, editStudentSuccess, loadStudentCreate,
   loadStudentEdit, loadStudents, loadStudentsFailure, loadStudentsSuccess, resetSelectedStudent } from './students.actions';
import { CustomError } from 'src/app/shared/customError';



export const studentsFeatureKey = 'students';

export interface StudentsState extends EntityState<Student> {
  loading: boolean;
  loaded: boolean;
  hasStudentAddFailed: boolean;
  hasStudentEditFailed: boolean;
  hasStudentLoadFailed: boolean;
  hasStudentDeleteFailed: boolean;
  error: CustomError | null;
  studentEditId?: number;
  selectedStudentId?: number;
  editOrCreateForm: boolean;
}

export const studentsAdapter = createEntityAdapter<Student>();

export const initialState: StudentsState = studentsAdapter.getInitialState({
  loading: false,
  loaded: false,
  hasStudentAddFailed: true,
  hasStudentEditFailed: true,
  error: null,
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
      editOrCreateForm: true,
      hasStudentAddFailed: true,
      hasStudentEditFailed: true,
      error: null
    };
  }),

  on(loadStudentCreate, (state) => {
    return {
      ...state,
      editOrCreateForm: false,
      hasStudentAddFailed: true,
      hasStudentEditFailed: true,
      error: null
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
    let selectedStudentId = 0;
    if (action.students[0]){
      selectedStudentId = action.students[0].id;
    }
    return studentsAdapter.addMany(action.students, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
      selectedStudentId
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
  }),
  on(changeSelectedStudent, (state, action) => {
    return{
      ...state,
      selectedStudentId: action.id
    };
  }),
  on(resetSelectedStudent, (state, action) => {
    return{
      ...state,
      selectedStudentId: 0
    };
  })
);
