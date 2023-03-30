import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(list: any[], filterKey: string, searchText: string): any {
    let filteredList = [];
    if(list.length && filterKey !== null && searchText.length > 0) {
      if(filterKey === 'developers') {
        console.log("Filtering developers");
        for(let x of list) {
          let found = false;
          for(let z of x.developers) {
            if(z.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
              console.log("dev found");
              found = true;
              break;
            }
          }
          if(found) filteredList.push(x);
        }
      } else {
        filteredList = list.filter(x => x[filterKey].toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      }
    } else {
      filteredList = JSON.parse(JSON.stringify(list));
    }
    return filteredList;
  }
}