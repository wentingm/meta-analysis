import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SearchResult } from '../../shared/models/search-result';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnChanges{

    @Input() searchResults!: SearchResult[];

    ngOnChanges(changes: SimpleChanges): void {
        if(changes) {
            console.log({ changes });
        }
    }
}
