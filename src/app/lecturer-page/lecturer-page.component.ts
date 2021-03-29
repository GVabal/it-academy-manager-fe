import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutUser } from '../store/users/users.actions';

@Component({
  selector: 'app-lecturer-page',
  templateUrl: './lecturer-page.component.html',
  styleUrls: ['./lecturer-page.component.scss']
})
export class LecturerPageComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.store.dispatch(logoutUser());
  }
}
