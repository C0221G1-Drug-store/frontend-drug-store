import{Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'currencyVND'})
export class CustomCurrencyPipe implements PipeTransform {
  transform(items: number): string {
<<<<<<< HEAD
    let item  = items.toString().split("");
    let result="";
    let j=0;
    for(let i = item.length -1 ;i >=0 ;i--){
      if(j% 3 ==0 && j !=0){
        result = ","+result;
      }
      result = item[i] + result;
      j++;
    }
    return result +" VND";
=======
    // let item  = items.toString().split("");
    //     // // let result="";
    //     // // let j=0;
    //     // // for(let i = item.length -1 ;i >=0 ;i--){
    //     // //   if(j% 3 ==0 && j !=0){
    //     // //     result = ","+result;
    //     // //   }
    //     // //   result = item[i] + result;
    //     // //   j++;
    //     // // }
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 5
    });
    return formatter.format(items);
>>>>>>> management-export-bill
  }
}
