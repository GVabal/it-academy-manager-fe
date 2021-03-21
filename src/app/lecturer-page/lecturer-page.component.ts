import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lecturer-page',
  templateUrl: './lecturer-page.component.html',
  styleUrls: ['./lecturer-page.component.scss']
})
export class LecturerPageComponent implements OnInit {

  reviewForm = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

}
