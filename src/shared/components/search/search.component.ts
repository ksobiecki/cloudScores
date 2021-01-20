import { Component, Output, EventEmitter } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'shr-search',
  templateUrl: './search.template.html',
  styleUrls: ['./search.less'],
})
export class SearchComponent {
  faSearch = faSearch;

  searchText = '';

  @Output() newSearchText = new EventEmitter<string>();

  changeSearchText(searchText: string) {
    this.newSearchText.emit(searchText);
  }
}
