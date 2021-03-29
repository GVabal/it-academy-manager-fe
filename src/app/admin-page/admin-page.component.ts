import { LoginPageComponent } from './../login-page/login-page.component';
import {getIsEditOrCreateForm} from '../store/students/students.selectors';
import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {logoutUser} from '../store/users/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  editOrCreateForm$!: Observable<boolean>;
  showStudents = true;
  showStreams = false;
  showUsers = false;
  isMobile = false;
  isCollapsed = false;
  tabName = 'Students';

  constructor(private store: Store, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 576;
    this.editOrCreateForm$ = this.store.select(getIsEditOrCreateForm);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 576;
  }

  public toggleToStudents(): void {
    this.showStudents = true;
    this.showStreams = false;
    this.showUsers = false;
    this.toggleNavbar();
    this.tabName = 'Students';
  }

  public toggleToStreams(): void {
    this.showStudents = false;
    this.showStreams = true;
    this.showUsers = false;
    this.toggleNavbar();
    this.tabName = 'Streams';
  }

  public toggleToUsers(): void {
    this.showStudents = false;
    this.showStreams = false;
    this.showUsers = true;
    this.toggleNavbar();
    this.tabName = 'Users';
  }

  toggleNavbar(): void {
    if (this.isMobile){
      this.isCollapsed = !this.isCollapsed;
    }
  }

  logout(): void {
    this.store.dispatch(logoutUser());
  }
}
