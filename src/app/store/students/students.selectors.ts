import { createFeatureSelector, createSelector } from '@ngrx/store';
import {studentsAdapter, studentsFeatureKey, StudentsState} from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>(studentsFeatureKey);

export const selectIsStudentsLoading = createSelector(selectStudentsState, studentsState => studentsState.loading);
export const selectIsStudentsLoaded = createSelector(selectStudentsState, studentsState => studentsState.loaded);

export const {
  selectAll: selectStudents,
} = studentsAdapter.getSelectors(selectStudentsState);
