import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(list: any[], filterKey: string, searchText: string): any {
    let filteredList = [];
    // Check if the list is not empty, the filterKey is not null, and the search text is not empty
    if(list.length && filterKey !== null && searchText.length > 0) {
       // If the filter key is 'developers', iterate over the list and search for the search text in the developers array of each item
      if(filterKey === 'developers') {
        for(let x of list) {
          let found = false;
          for(let z of x.developers) {
            if(z.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
              found = true;
              break;
            }
          }
          if(found) filteredList.push(x);
        }
      } else {
        // If the filter key is not 'developers', use the filter function to filter the list based on the Scrum Master.
        filteredList = list.filter(x => x[filterKey].toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      }
    } else {
      filteredList = JSON.parse(JSON.stringify(list));
    }
    return filteredList;
  }
}