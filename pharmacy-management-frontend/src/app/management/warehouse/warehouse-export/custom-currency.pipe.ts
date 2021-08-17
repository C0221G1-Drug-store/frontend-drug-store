import{Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'currencyVND'})
export class CustomCurrencyPipe implements PipeTransform {
  transform(items: number): string {
    let item  = items.toString().split("");
    let result="";
    let j=1;
    for(let i = item.length -1 ;i >=0 ;i--){
      result = item[i] + result;
      if(j % 3 == 0 && result != ''){
        result = ","+result;
      }
      j++;
    }
    return result +" VND";
  }
}
