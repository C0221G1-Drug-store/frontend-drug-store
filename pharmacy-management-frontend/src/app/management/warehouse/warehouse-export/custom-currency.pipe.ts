import{Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'currencyVND'})
export class CustomCurrencyPipe implements PipeTransform {
  transform(items: number): string {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 5
    });
    return formatter.format(items);
    // return items.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' VND';
  }
}
