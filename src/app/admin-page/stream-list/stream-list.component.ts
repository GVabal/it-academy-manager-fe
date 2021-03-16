import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomError } from 'src/app/shared/customError';
import { StreamService } from '../../service/stream.service';
import { Stream } from '../../shared/stream';
import {addStream, deleteStream} from '../../store/stream/stream.actions';
import {getIsStreamLoading, getStreamError, selectStreams} from '../../store/stream/stream.selectors';


@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  error$!: Observable<CustomError | null>;
  streams$!: Observable<Stream[]>;
  streamForm!: FormGroup;

  constructor(private streamService: StreamService, private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsStreamLoading);
    this.error$ = this.store.select(getStreamError);
    this.streams$ = this.store.select(selectStreams);

    this.streamForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern('.{2,30}')
      ]]
    });
  }

  get streamName(): FormControl {
    return this.streamForm.get('name') as FormControl;
  }

  deleteStream(id: number): void {
    if (confirm('Are you sure you want to remove this stream?')) {
      this.store.dispatch(deleteStream({id}));
    }
  }

  submitForm(): void {
    this.store.dispatch(addStream({stream: this.streamForm.value}));
  }
}
