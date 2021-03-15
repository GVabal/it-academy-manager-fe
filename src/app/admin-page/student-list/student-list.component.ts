import { Student } from '../../shared/student';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteStudent } from 'src/app/store/students/students.actions';
import { getHasStudentLoadFailed, getIsStudentsLoaded, getIsStudentsLoading, selectStudents, getStudentsError } from '../../store/students/students.selectors';
import { loadStudentCreate, loadStudentEdit } from 'src/app/store/students/students.actions';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]> | undefined;
  isStudentsLoading$: Observable<boolean> | undefined;
  isStudentsLoaded$: Observable<boolean> | undefined ;
  hasLoadFailed$: Observable<boolean> | undefined ;
  error$: Observable<Error | null> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.isStudentsLoading$ =  this.store.select(getIsStudentsLoading);
    this.isStudentsLoaded$ = this.store.select(getIsStudentsLoaded);
    this.hasLoadFailed$ = this.store.select(getHasStudentLoadFailed);
    this.error$ = this.store.select(getStudentsError);
    this.students$ = this.store.select(selectStudents);
  }

  onEdit(student: Student): void{
    if (student.id){
      this.store.dispatch(loadStudentEdit({id: student.id}));
    }
  }

  onCreate(): void{
    this.store.dispatch(loadStudentCreate());
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to remove this student?')) {
      this.store.dispatch(deleteStudent({id}));
    }
  }
}
