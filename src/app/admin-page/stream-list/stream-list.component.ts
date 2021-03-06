import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomError } from 'src/app/shared/customError';
import { Stream } from '../../shared/stream';
import { addStream, deleteStream } from '../../store/stream/stream.actions';
import { getIsStreamLoading, getStreamError, selectStreams } from '../../store/stream/stream.selectors';

const streamNamePattern = '^[a-zA-ZĄąČčĘęĖėĮįŠšŲųūŪŽž_-\\s]*$';
const noMultipleSpacesPattern = '(?:(?![ ]{2}).)+';

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

  constructor(private store: Store,
              private fb: FormBuilder,
              public dialog: MatDialog) {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsStreamLoading);
    this.error$ = this.store.select(getStreamError);
    this.streams$ = this.store.select(selectStreams);

    this.streamForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(streamNamePattern),
        Validators.pattern(noMultipleSpacesPattern),
      ]]
    });
  }

  get streamName(): FormControl {
    return this.streamForm.get('name') as FormControl;
  }

  deleteStream(id: number): void {
    if (confirm('Are you sure you want to remove this stream?')) {
      this.store.dispatch(deleteStream({ id }));
    }
  }

  submitForm(): void {
    this.store.dispatch(addStream({ stream: this.streamForm.value }));
  }
}
