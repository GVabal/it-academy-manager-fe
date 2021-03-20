import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentsAdapter, studentsFeatureKey, StudentsState } from './students.reducer';

export const getStudentsFeatureState = createFeatureSelector<StudentsState>(studentsFeatureKey);

export const getIsStudentsLoading = createSelector(getStudentsFeatureState, studentsState => studentsState.loading);
export const getIsStudentsLoaded = createSelector(getStudentsFeatureState, studentsState => studentsState.loaded);
export const getHasStudentAddFailed = createSelector(getStudentsFeatureState, studentsState => studentsState.hasStudentAddFailed);
export const getStudentsError = createSelector(getStudentsFeatureState, studentsState => studentsState.error);
export const getHasStudentLoadFailed = createSelector(getStudentsFeatureState, studentsState => studentsState.hasStudentLoadFailed);
export const getStudentEditId = createSelector(getStudentsFeatureState, studentsState => studentsState.studentEditId);
export const getHasStudentEditFailed = createSelector(getStudentsFeatureState, studentsState => studentsState.hasStudentEditFailed);
export const getIsEditOrCreateForm = createSelector(getStudentsFeatureState, studentsState => studentsState.editOrCreateForm);
export const getSelectedStudentId = createSelector(getStudentsFeatureState, studentsState => studentsState.selectedStudentId);
export const getStudents = createSelector(getStudentsFeatureState, studentsAdapter.getSelectors().selectAll);
export const getStudentById = (id: number) => createSelector(getStudents, students => students.find(student => student.id === id));
export const {selectAll: selectStudents} = studentsAdapter.getSelectors(getStudentsFeatureState);
