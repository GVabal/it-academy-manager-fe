import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  template: `
    <app-student-add-form></app-student-add-form>
  `,
  styles: []
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
