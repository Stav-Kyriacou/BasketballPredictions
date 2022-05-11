import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../interfaces/component-can-deactivate';

@Injectable({
  providedIn: 'root'
})
export class SaveCheckGuard implements CanDeactivate<ComponentCanDeactivate> {

  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.canDeactivate()) {
      return true;
    } else {
      return confirm("You have unsaved changes, are you sure you want to leave this page?");
    }
  }
}