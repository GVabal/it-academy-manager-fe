import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Sample} from '../shared/Sample';
import {Store} from '@ngrx/store';
import { selectSamples } from '../store/sample.selectors';
import {loadSamples} from '../store/sample.actions';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  samples$: Observable<Sample[]> = this.store.select(selectSamples);

  constructor(private store: Store) { }

  
  ngOnInit(): void {
    this.store.dispatch(loadSamples());
  }

}
