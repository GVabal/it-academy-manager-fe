import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { select, Store} from '@ngrx/store';
import { Observable, } from 'rxjs';
import { filter, map, take, } from 'rxjs/operators';
import { loadStreams } from './store/stream/stream.actions';
import { getStreamState } from './store/stream/stream.selectors';

@Injectable({
  providedIn: 'root'
})

export class StreamGuard implements CanActivate {

  constructor(private store: Store){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean | UrlTree | Observable<boolean | UrlTree>  {
      this.store.dispatch(loadStreams());
      return this.store.pipe(select(getStreamState),
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
