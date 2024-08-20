import { Component, OnInit } from '@angular/core';
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
        this.searchService.sendPicoSearchParams(input)
        .subscribe((data: any) => {
            this.searchResults = JSON.parse(data) as SearchResult[];
            this.configService.updateSearchResultAvailabilityStatus(true);
        });
    }
}
