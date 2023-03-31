import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements AfterViewInit {
  @Input('searchPlaceholder') searchPlaceholder = 'Filter...';
  @Output() searchTextEvent = new EventEmitter();
  @ViewChild('searchBox') searchBox: any; //The component uses the '@ViewChild' decorator to get a reference to the search box element in the component's view.

  private searchTextListener: any;
  public searchText: string | null = null;
// The 'ngAfterViewInit' method sets up an event listener on the search box element using the 'fromEvent' function from the 'rxjs' module. 
// The method then pipes the observable with some operators to map the input event to the search text value, debounce the events by 100ms to avoid too many search queries,
// and filter out repeated search text values. Finally, the method subscribes to the observable and emits the search text value to the parent component via the 'searchTextEvent' output property.
  ngAfterViewInit() {
    this.searchTextListener = fromEvent(this.searchBox.nativeElement, 'input')
      .pipe(
        map((event: any) => (<HTMLInputElement>event.target).value),
        debounceTime(100)
      )
      .subscribe((data) => this.searchTextEvent.emit(this.searchText));
  }

  ngOnDestroy() {
    this.searchTextListener?.unsubscribe();
  }
}
