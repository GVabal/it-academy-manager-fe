import { Student } from './../shared/student';
import { addStudentSuccess, loadStudentEdit, editStudentDone } from './../store/students/students.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-page',
  template: `
    <app-student-add-form></app-student-add-form>
    <div class ="d-flex justify-content-center">
      <button class="btn btn-primary " (click) ="onClick()" >Edit</button>
      <button class="btn btn-primary " (click) ="onFinish()" >Done</button>
    </div>
    <app-student-edit-form></app-student-edit-form>
  `,
  styles: []
})
export class AdminPageComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onClick(): void{
    this.store.dispatch(loadStudentEdit({id: '1'}));
  }

  onFinish(): void{
    this.store.dispatch(editStudentDone());
  }
}
