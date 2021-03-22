import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { Review } from '../shared/review';

const reviewsUrl = `${environment.baseUrl}/reviews`;
const studentsUrl = `${environment.baseUrl}/students`

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(reviewsUrl, review);
  }

  getReviewsByStudentId(id: number): Observable<Review[]>{
    return this.http.get<Review[]>(studentsUrl + `/${id}/reviews`);
  }
}
