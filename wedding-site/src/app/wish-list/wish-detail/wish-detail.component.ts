import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WishService } from '../wish.service';


import { IWish } from '../wish';

@Component({
  selector: 'app-wish-detail',
  templateUrl: './wish-detail.component.html',
  styleUrls: ['./wish-detail.component.css']
})
export class WishDetailComponent implements OnInit {

  pageTitle = 'Wish Detail';
  errorMessage: string;
  wish: IWish;

    constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _wishService: WishService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getWish(id);
    }
  }

  getWish(id: number) {
    this._wishService.getWish(id).subscribe(
      wish => this.wish = wish,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this._router.navigate(['/wishlist']);
  }

}
