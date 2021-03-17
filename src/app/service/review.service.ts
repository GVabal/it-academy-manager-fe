import { Review } from './../shared/review';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.baseUrl}/reviews`;

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  loadReviews(): Observable<Review[]>{
    return of([
      {
        id: 1,
        studentId: 1,
        streamId: 1,
        overallComment: "Very nice student",
        abilityToLearnGrade: 10,
        abilityToLearnComment: '',
        motivationGrade: 10,
        motivationComment: '',
        extraMileGrade: 10,
        extraMileComment: '',
        communicationGrade: 10,
        communicationComment: ''
      },
      {
        id: 2,
        studentId: 1,
        streamId: 1,
        overallComment: "Cool student",
        abilityToLearnGrade: 9,
        abilityToLearnComment: '',
        motivationGrade: 7,
        motivationComment: '',
        extraMileGrade: 9,
        extraMileComment: '',
        communicationGrade: 10,
        communicationComment: ''
      },
      {
        id: 3,
        studentId: 1,
        streamId: 1,
        overallComment: "Smart student",
        abilityToLearnGrade: 5,
        abilityToLearnComment: '',
        motivationGrade: 6,
        motivationComment: '',
        extraMileGrade: 7,
        extraMileComment: '',
        communicationGrade: 10,
        communicationComment: ''
      }
    ]);
  }
}
