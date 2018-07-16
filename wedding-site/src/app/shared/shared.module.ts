import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertPricesPipe } from './convert-prices.pipe';
import { TOASTR_TOKEN, Toastr } from 'src/app/shared/toastr.service';

declare let toastr: Toastr;

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    }
  ],
  declarations: [ConvertPricesPipe],
  exports: [
    CommonModule,
    FormsModule,
    ConvertPricesPipe,
  ]
})
export class SharedModule { }
