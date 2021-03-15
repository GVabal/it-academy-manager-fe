import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { select, Store} from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Stream } from './shared/stream';
import { loadStreams, loadStreamSuccess } from './store/stream/stream.actions';
import { selectStreams, selectStreamState } from './store/stream/stream.selectors';
import { selectIsStudentsLoaded } from './store/students/students.selectors';

@Injectable({
  providedIn: 'root'
})

export class StreamGuard implements CanActivate {

  constructor(private store: Store){}

  /*private checkStore() {
    this.store.pipe(select(loadStreams),
    tap(loaded => {
      if (!loaded) {
        this.store.dispatch(loadStreams());
      }
    }),
    take(1)
  );}*/


  /*waitForDataToLoad(): Observable<Stream[]> {
    return this.store.select(selectStreams).pipe(
        filter(stream => stream.length > 0));
}*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean | UrlTree | Observable<boolean | UrlTree>  {
      this.store.dispatch(loadStreams());
      //this.checkStore();
      return this.store.pipe(select(selectStreamState),
      filter(stream => !stream.loading),
      take(1),
      map(stream => {
          if (!stream.loaded) {
              throw stream.error;
          }
          return true;    
        })
      );
    }
  }
