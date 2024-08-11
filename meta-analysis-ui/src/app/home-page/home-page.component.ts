import { Component, OnInit } from '@angular/core';
import { MOCK_SEARCH_RESULTS } from '../shared/mock-data';
import { ConfigHandlerService } from '../shared/services/config-handler.service';
import { SessionConfig } from '../shared/models/session-config';
import { SearchService } from '../shared/services/search.service';
import { PicoSearchQuery } from '../shared/models/search-params';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
    searchResults = MOCK_SEARCH_RESULTS;
    currentConfig!: SessionConfig;
    picoSearchQuery!: PicoSearchQuery;

    constructor(private configService: ConfigHandlerService,
        private searchService: SearchService
    ) {}

    ngOnInit(): void {
        this.configService.config$.subscribe((config) => {
            this.currentConfig = config;
        })
    }

    recievePicoSearchQuery(input: PicoSearchQuery) {
        this.picoSearchQuery = input;
    }
}
