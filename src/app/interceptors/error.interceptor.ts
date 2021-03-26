import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse && response.status === 403) {
          document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
          this.router.navigate(['/login']);
        }
        return throwError(response.error.message);
      })
    );
  }
}
