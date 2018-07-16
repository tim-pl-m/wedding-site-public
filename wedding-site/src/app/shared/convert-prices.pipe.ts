import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertPrices'
})
export class ConvertPricesPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value + ",-";
  }

}
