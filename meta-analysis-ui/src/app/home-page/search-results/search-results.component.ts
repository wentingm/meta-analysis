import { Component, Input } from '@angular/core';
import { SearchResult } from '../../shared/models/search-result';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

    @Input() searchResults!: SearchResult[];
}
