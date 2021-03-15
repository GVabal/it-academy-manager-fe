import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentsAdapter, studentsFeatureKey, StudentsState } from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentsState>(studentsFeatureKey);

export const selectIsStudentsLoading = createSelector(selectStudentsState, studentsState => studentsState.loading);
export const selectIsStudentsLoaded = createSelector(selectStudentsState, studentsState => studentsState.loaded);
export const selectHasStudentAddFailed = createSelector(selectStudentsState, studentsState => studentsState.hasStudentAddFailed);
export const selectStudentsError = createSelector(selectStudentsState, studentsState => studentsState.error);
export const getHasStudentLoadFailed = createSelector(selectStudentsState, studentsState => studentsState.hasStudentLoadFailed);



export const selectIsEditingStudent = createSelector(selectStudentsState, studentsState => studentsState.studentEdit);
export const selectSudentEditId = createSelector(selectStudentsState, studentsState => studentsState.studentEditId);
export const selectHasStudentEditFailed = createSelector(selectStudentsState, studentsState => studentsState.hasStudentEditFailed);

export const getStudents = createSelector(selectStudentsState, studentsAdapter.getSelectors().selectAll);
export const getStudentById = (id: string) => createSelector(getStudents, (students) => {
  if (students) {
    return students.find(student => {
      return student.id === parseInt(id, 10);
    });
  } else {
    return {};
  }
});

export const {
  selectAll: selectStudents,
} = studentsAdapter.getSelectors(selectStudentsState);
