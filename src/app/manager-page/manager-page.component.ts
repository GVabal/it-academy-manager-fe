import { Store } from '@ngrx/store';
import { ReviewService } from './../service/review.service';
import { Component, OnInit } from '@angular/core';
import { loadReviews } from '../store/review/review.action';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss']
})
export class ManagerPageComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

}
