import { Student } from './../shared/student';
import { addStudentSuccess, loadStudentEdit, editStudentDone } from './../store/students/students.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-page',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-3">
        <app-student-list></app-student-list>
      </div>
      <div class="col-9">
      <app-student-add-form></app-student-add-form>
      </div>
      <div class="col-3">
        <app-stream-list></app-stream-list>
      </div>
    </div>
  </div>
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
