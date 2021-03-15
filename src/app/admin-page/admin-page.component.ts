import { selectEditOrCreateForm } from './../store/students/students.selectors';
import { Student } from './../shared/student';
import { addStudentSuccess, loadStudentEdit, editStudentDone } from './../store/students/students.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-3">
        <app-student-list></app-student-list>
      </div>
      <div class="col-9">
      <app-student-add-form *ngIf="(editOrCreateForm$ | async) === false"></app-student-add-form>
      <app-student-edit-form *ngIf="editOrCreateForm$ | async"></app-student-edit-form>
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

  editOrCreateForm$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.editOrCreateForm$ = this.store.select(selectEditOrCreateForm);
  }

}
