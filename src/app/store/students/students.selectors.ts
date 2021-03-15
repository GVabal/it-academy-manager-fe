import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentsAdapter, studentsFeatureKey, StudentsState } from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>(studentsFeatureKey);

export const selectIsStudentsLoading = createSelector(selectStudentsState, studentsState => studentsState.loading);
export const selectIsStudentsLoaded = createSelector(selectStudentsState, studentsState => studentsState.loaded);
export const selectHasStudentAddFailed = createSelector(selectStudentsState, studentsState => studentsState.hasStudentAddFailed);
export const selectStudentsError = createSelector(selectStudentsState, studentsState => studentsState.error);
export const getHasStudentLoadFailed = createSelector(selectStudentsState, studentsState => studentsState.hasStudentLoadFailed);

export const selectSudentEditId = createSelector(selectStudentsState, studentsState => studentsState.studentEditId);
export const selectHasStudentEditFailed = createSelector(selectStudentsState, studentsState => studentsState.hasStudentEditFailed);
export const selectEditOrCreateForm = createSelector(selectStudentsState, studentsState => studentsState.editOrCreateForm);

export const getStudents = createSelector(selectStudentsState, studentsAdapter.getSelectors().selectAll);
export const getStudentById = (id: number) => createSelector(getStudents, students => students.find(student => student.id === id));

export const {
  selectAll: selectStudents,
} = studentsAdapter.getSelectors(selectStudentsState);
