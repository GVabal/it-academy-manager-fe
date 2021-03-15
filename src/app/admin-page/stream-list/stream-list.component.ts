import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StreamService } from '../../service/stream.service';
import { Stream } from '../../shared/stream';
import {deleteStream, loadStreams} from '../../store/stream/stream.actions';
import {getIsStreamLoading, getStreamError, selectStreams} from '../../store/stream/stream.selectors';


@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<Error | null>;
  streams$!: Observable<Stream[]>;
  isLoading = false;
  error: Error | null = null;

  constructor(private streamService: StreamService, private store: Store) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsStreamLoading);
    this.error$ = this.store.select(getStreamError);
    this.streams$ = this.store.select(selectStreams);
    this.store.dispatch(loadStreams());
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    this.error$.subscribe(error => this.error = error);
  }

  deleteStream(id: number): void {
    this.store.dispatch(deleteStream({id}));
  }
}
