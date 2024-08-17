import { Component, OnInit } from '@angular/core';
import { MOCK_SEARCH_RESULTS } from '../shared/mock-data';
import { ConfigHandlerService } from '../shared/services/config-handler.service';
import { SessionConfig } from '../shared/models/session-config';
import { SearchService } from '../shared/services/search.service';
import { PicoSearchQuery } from '../shared/models/search-params';
import { SearchResult } from '../shared/models/search-result';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
    searchResults!: SearchResult[];
    currentConfig!: SessionConfig;

    constructor(private configService: ConfigHandlerService,
        private searchService: SearchService
    ) {}

    ngOnInit(): void {
        this.configService.config$.subscribe((config) => {
            this.currentConfig = config;
        })
    }

    startPicoSearch(input: PicoSearchQuery) {
        this.configService.updateSearchResultAvailabilityStatus(false);
        this.searchService.sendPicoSearchParams(input);
        this.searchService.fetchSearchResults().subscribe((data) => {
            this.searchResults = data;
            this.configService.updateSearchResultAvailabilityStatus(true);
        });
    }
}
