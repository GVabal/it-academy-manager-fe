import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {

  constructor(private http: HttpClient) { }

  getProfilePictureFile(url: string): Observable<File> {
    return this.http.get<Blob>(url, {observe: 'response', responseType: 'blob' as 'json'}).pipe(
      map(httpResponse => new File([httpResponse.body as BlobPart], 'image'))
    );
  }
}
