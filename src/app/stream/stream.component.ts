import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StreamService } from '../service/stream.service';
import { Stream } from '../shared/stream';
import { addStream } from '../store/stream/stream.actions';
import { selectStreams } from '../store/stream/stream.selectors';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  streamForm = this.fb.group ({
    name : new FormControl('', [
      Validators.required,
      Validators.pattern('.{2,50}')
    ])
  });

  streams$: Observable<Stream[]> = this.store.select(selectStreams);
  hasLoadFailed = false;
  isLoading = false;
  isLoaded = false;
  error: Error | null = null;

  constructor(private streamService: StreamService,
    private store: Store,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get streamName(): FormControl {
    return this.streamForm.get('name') as FormControl;
  }

  submitForm(): void {
    this.store.dispatch(addStream({stream: this.streamForm.value}));
  }

}
