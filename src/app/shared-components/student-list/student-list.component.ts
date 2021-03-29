import { Student } from '../../shared/student';
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeSelectedStudent, deleteStudent } from 'src/app/store/students/students.actions';
import { getHasStudentLoadFailed, getIsStudentsLoaded, getIsStudentsLoading, selectStudents, getStudentsError } from '../../store/students/students.selectors';
import { loadStudentCreate, loadStudentEdit } from 'src/app/store/students/students.actions';
import { CustomError } from 'src/app/shared/customError';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from 'src/app/admin-page/student-form/student-form.component';
import { count, map } from 'rxjs/operators';
import { BlockScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]> | undefined;
  students: Student[] = [];
  isStudentsLoading$: Observable<boolean> | undefined;
  isStudentsLoaded$: Observable<boolean> | undefined;
  hasLoadFailed$: Observable<boolean> | undefined;
  error$: Observable<CustomError | null> | undefined;
  @Input() isAdminView: boolean | undefined;
  isEdit = false;

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isStudentsLoading$ = this.store.select(getIsStudentsLoading);
    this.isStudentsLoaded$ = this.store.select(getIsStudentsLoaded);
    this.hasLoadFailed$ = this.store.select(getHasStudentLoadFailed);
    this.error$ = this.store.select(getStudentsError);
    this.store.select(selectStudents).subscribe(students => this.students = students.slice().reverse());
  }

  openDialog(isEdit: boolean): void {
    if ( this.dialog.openDialogs.length === 0 ) {
      if (isEdit) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
      this.dialog.open(StudentFormComponent, {
        data: {
          isEditView: this.isEdit,
        }, hasBackdrop: true,
        closeOnNavigation: true,
        maxWidth: '700px',
        maxHeight: '780px',
        height: 'calc(100vh - 64px)',
        width: '100%',
        position: {
          top: '64px',
        }
      });
    }
  }

  onEdit(student: Student): void {
    if (student.id) {
      this.store.dispatch(loadStudentEdit({ id: student.id }));
    }
  }

  onCreate(): void {
    this.store.dispatch(loadStudentCreate());
  }

  onChoose(id: number): void {
    if (!this.isAdminView) {
      this.store.dispatch(changeSelectedStudent({ id }));
    }
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to remove this student?')) {
      this.store.dispatch(deleteStudent({ id }));
    }
  }
}
