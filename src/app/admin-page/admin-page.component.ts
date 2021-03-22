import {getIsEditOrCreateForm} from '../store/students/students.selectors';
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  editOrCreateForm$!: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.editOrCreateForm$ = this.store.select(getIsEditOrCreateForm);
  }

}
