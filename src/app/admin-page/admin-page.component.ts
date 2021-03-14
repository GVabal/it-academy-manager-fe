import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  template: `
    <div>
      <app-student-add-form></app-student-add-form>
      <app-stream-list></app-stream-list>
    </div>
  `,
  styles: [`
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `]
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
