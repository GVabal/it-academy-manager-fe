import { Component, OnInit } from '@angular/core';

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
    </div>
  </div>
  `,
  styles: []
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
