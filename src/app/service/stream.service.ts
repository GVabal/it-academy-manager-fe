import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stream } from '../shared/stream';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient) { }

  loadStreams(): Observable<Stream[]>{
       return this.http.get<Stream[]>('https://it-academy-manager-be.herokuapp.com/api/streams');
  }

}
