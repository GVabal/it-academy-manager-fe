  import { Injectable } from '@angular/core';
  import {Observable, of} from 'rxjs';
  import {Sample} from '../shared/Sample';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor() { }

  getAll(): Observable<Sample[]> {
    const sampleList: Sample[] = [
      {id: 1, content: 'one'},
      {id: 2, content: 'two'},
      {id: 3, content: 'three'}
    ];
    return of(sampleList);
  }
}
