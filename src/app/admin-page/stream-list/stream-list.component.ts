import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StreamService } from '../../service/stream.service';
import { Stream } from '../../shared/stream';
import {deleteStream, loadStreams} from '../../store/stream/stream.actions';
import {selectIsStreamLoaded, selectIsStreamLoading, selectStreams} from '../../store/stream/stream.selectors';


@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {
  isLoading$: Observable<boolean> = this.store.select(selectIsStreamLoading);
  isLoaded$: Observable<boolean> = this.store.select(selectIsStreamLoaded);
  streams$: Observable<Stream[]> = this.store.select(selectStreams);
  isLoading = false;
  isLoaded = false;

  constructor(private streamService: StreamService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadStreams());
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    this.isLoaded$.subscribe(isLoaded => this.isLoaded = isLoaded);
  }

  deleteStream(id: number): void {
    this.store.dispatch(deleteStream({id}));
  }
}
