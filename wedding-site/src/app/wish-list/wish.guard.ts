import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WishService } from './wish.service';
import { IWish } from './wish';
import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishGuard implements CanActivate {

  wish: IWish;

  constructor(private _router: Router, private _wishService: WishService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const id = +next.url[1].path;

    //TODO - Implement so we cant access an ID that is not within the list

    if (isNaN(id) || id < 1) {
      alert('Invalid wish Id');
      this._router.navigate(['/wishlist']);
      return false;
    }


    return true;

  }
}
