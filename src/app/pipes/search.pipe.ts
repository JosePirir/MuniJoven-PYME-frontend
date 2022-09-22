import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any, search:any): any {
    if(search == undefined)
    {
      return products;
    }
    else
    {
      return products.filter((item: { name: string; gender: string; })=>
        {
          return item.name.toLowerCase().includes(search.toLowerCase()) || 
          item.gender.toLowerCase().includes(search.toLowerCase())
        })
    }
  }

}
