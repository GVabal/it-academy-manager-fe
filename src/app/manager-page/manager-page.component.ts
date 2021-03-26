import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelectedStudentId } from '../store/students/students.selectors';
import { resetSelectedStudent } from '../store/students/students.actions';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  isInListView = true;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getSelectedStudentId).subscribe((id) => {
      if (id !== 0){
        this.isInListView = !this.isInListView;
      }
      });
  }

  onBack(): void{
    this.isInListView = !this.isInListView;
    this.store.dispatch(resetSelectedStudent());
  }
}
