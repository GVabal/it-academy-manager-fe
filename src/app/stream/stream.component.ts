import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StreamService } from '../service/stream.service';
import { Stream } from '../shared/stream';
import { loadStreams } from '../store/stream/stream.actions';
import { selectStreams } from '../store/stream/stream.selectors';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  streams$: Observable<Stream[]> = this.store.select(selectStreams);

  constructor(private streamService: StreamService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadStreams());
  }  
}
