import { Review } from './../shared/review';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.baseUrl}/students`;

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewsByStudentId(id: number): Observable<Review[]>{
    return this.http.get<Review[]>(apiUrl + '/' + id + '/reviews');
  }
}
