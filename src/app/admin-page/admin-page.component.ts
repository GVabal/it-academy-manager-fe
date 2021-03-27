import {getIsEditOrCreateForm} from '../store/students/students.selectors';
import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {logoutUser} from '../store/users/users.actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  editOrCreateForm$!: Observable<boolean>;
  showStudents = true;
  showStreams = false;
  isMobile = false;


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.editOrCreateForm$ = this.store.select(getIsEditOrCreateForm);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 770;
  }

  public toggleToStudents(): void {
    this.showStudents = true;
    this.showStreams = false;
  }

  public toggleToStreams(): void {
    this.showStudents = false;
    this.showStreams = true;
  }

  logout(): void {
    this.store.dispatch(logoutUser());
  }
}
