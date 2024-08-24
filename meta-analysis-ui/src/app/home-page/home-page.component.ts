import { Component, OnInit } from '@angular/core';
import { ConfigHandlerService } from '../shared/services/config-handler.service';
import { SessionConfig } from '../shared/models/session-config';
import { SearchService } from '../shared/services/search.service';
import { PicoSearchQuery } from '../shared/models/search-params';
import { SearchResult } from '../shared/models/search-result';
import { MOCK_SEARCH_RESULTS } from '../shared/mock-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
    searchResults!: SearchResult[];
    currentConfig!: SessionConfig;
    wasSearchClicked: boolean = false;

    //TODO: Remove for prod
    private devMode = true;

    constructor(private configService: ConfigHandlerService,
        private searchService: SearchService
    ) {}

    ngOnInit(): void {
        this.configService.config$.subscribe((config) => {
            this.currentConfig = config;
        })
    }

    startPicoSearch(input: PicoSearchQuery) {
        this.wasSearchClicked = true;
        this.configService.updateSearchResultAvailabilityStatus(false);

        if(!this.devMode) {
            this.searchService.sendPicoSearchParams(input)
            .subscribe((data: any) => {
                this.searchResults = JSON.parse(data) as SearchResult[];
                this.configService.updateSearchResultAvailabilityStatus(true);
            });
        }

        //For testing purposes only
        else {
            setTimeout(() => {
                this.searchResults = MOCK_SEARCH_RESULTS;
                this.configService.updateSearchResultAvailabilityStatus(true);
            }, 10);
        }
    }

    uploadPapers() {
        
    }
}
