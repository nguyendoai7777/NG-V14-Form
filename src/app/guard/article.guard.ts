import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CheckDeActivate } from '../model/check-deactivate.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleGuard implements CanActivate, CanActivateChild, CanLoad, CanDeactivate<CheckDeActivate> {

  constructor(private readonly authService: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(map(user => !!user))
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const slug = childRoute.params?.['slug'];
    if(!slug) return of(false);
    return this.authService.currentUser$.pipe(
      map(user => user.article.includes(slug)))
  }

  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(map(user => !!user))
  }

  canDeactivate(component: CheckDeActivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.checkDeActivate(currentRoute, currentState, nextState);
  }
}
