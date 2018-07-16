import { Component, OnInit, Inject } from '@angular/core';
import { IWish} from './wish';
import { WishService } from './wish.service';
import { TOASTR_TOKEN, Toastr } from 'src/app/shared/toastr.service';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  pageTitle = 'Wish List';
  imageWidth = 50;
  imageMargin = 2;
  errorMessage: string;
  createWish = false;
  createWishForm: FormGroup;
  loading = false;
  submitted = false;


  filteredWishes: IWish[];
  wishes: IWish[] = [];

  _listFilter: string;

  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredWishes = this.listFilter ? this.performFilter(this.listFilter) : this.wishes;
  }

  deleteWish(wish) {

    console.log('delete wish ' + wish.wishId);

    const index = this.wishes.indexOf(wish);

    this.wishes.splice(index, 1);

    // TODO - this._wishService.deleteWish();

  }


  constructor(private _wishService: WishService, private _formBuilder: FormBuilder,
    @ Inject(TOASTR_TOKEN) private _toastr: Toastr) { }

  performFilter(filterBy: string): IWish[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.wishes.filter((wish: IWish) =>
            wish.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  openExternalUrl(url: string): void {
      console.log(url);
      window.location.href = url;
      return;
  }

  ngOnInit(): void {

    this.createWishForm = this._formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      wishUrl: ['', Validators.required]
    });

    this._wishService.getWishes()
            .subscribe(wishes => {
                this.wishes = wishes;
                this.filteredWishes = this.wishes;
            },
                error => this.errorMessage = <any>error);
  }

  // convenience getter for easy access to form fields
  get f() { return this.createWishForm.controls; }

  createWishClicked() {
    this.createWish = true;
  }

  unclickCreateWish() {
    this.createWish = false;
  }

  onSubmit(formData) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.createWishForm.invalid) {
        return;
    }

    this.loading = true;

    const name: string = formData.name.value;
    const price: number = formData.price.value;
    const description: string = formData.description.value;
    const wishUrl: string = formData.wishUrl.value;

    this._wishService.createWish(name, price, description, wishUrl)
    .subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.wishes.push(data);
        this._toastr.success('Wish added successfully');

      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );

  }

}
