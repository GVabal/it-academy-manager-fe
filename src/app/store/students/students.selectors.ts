import { createFeatureSelector, createSelector } from '@ngrx/store';
import {studentsAdapter, studentsFeatureKey, StudentsState} from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>(studentsFeatureKey);

export const selectIsStudentsLoading = createSelector(selectStudentsState, studentsState => studentsState.loading);
export const selectIsStudentsLoaded = createSelector(selectStudentsState, studentsState => studentsState.loaded);
export const selectHasStudentAddFailed = createSelector(selectStudentsState, studentsState => studentsState.hasStudentAddFailed);
export const selectStudentsError = createSelector(selectStudentsState, studentsState => studentsState.error);

export const getStudents = createSelector(selectStudentsState, studentsAdapter.getSelectors().selectAll);
export const getStudentById = (id : string) => createSelector(getStudents, (students) => {
  if (students) {
    return students.find(student => {
      return student.id! === parseInt(id);
    });
  } else {
    return {};
  }
});

export const {
  selectAll: selectStudents,
} = studentsAdapter.getSelectors(selectStudentsState);
