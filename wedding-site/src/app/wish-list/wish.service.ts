import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { IWish } from './wish';
import { CommonService } from '../shared/common.service';


@Injectable()
export class WishService {

  private _wishUrl = '../assets/wishes.json';
  private _createWishUrl = '/createWish';

  createWish(name: string, price: number, description: string, wishUrl: string): any {

    return this._http.post<IWish>(this._createWishUrl, {name: name, price: price, description: description, wishUrl: wishUrl}).pipe(
      map(wish => {

        return wish;
      }),
      catchError(this._commonService.handleError), );
  }


  constructor(private _http: HttpClient, private _commonService: CommonService) { }

  getWishes(): Observable<IWish[]> {

    console.log(this._wishUrl);

    return this._http.get<IWish[]>(this._wishUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this._commonService.handleError), );
  }

  getWish(id: number): Observable<IWish> {
    return this.getWishes().pipe(
      map((wishes: IWish[]) => wishes.find(w => w.wishId === id)));
  }


}
