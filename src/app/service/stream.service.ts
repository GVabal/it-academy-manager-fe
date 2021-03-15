import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stream } from '../shared/stream';
import {environment} from '../../environments/environment';

const apiUrl = `${environment.baseUrl}/streams`;

@Injectable({
  providedIn: 'root'
})

export class StreamService {

  constructor(private http: HttpClient) { }

  loadStreams(): Observable<Stream[]>{
    return this.http.get<Stream[]>(apiUrl);
  }

  addStream(stream: Stream): Observable<Stream> {
    return this.http.post<Stream>(apiUrl, stream);   
  }

  deleteStream(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/${id}`);
  }
}
