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
  @ViewChild('searchBox') searchBox: any;

  private searchTextListener: any;
  public searchText: string | null = null;

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
