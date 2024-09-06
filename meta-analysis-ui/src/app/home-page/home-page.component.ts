import { Component, OnInit } from '@angular/core';
import { ConfigHandlerService } from '../shared/services/config-handler.service';
import { SessionConfig } from '../shared/models/session-config';
import { SearchService } from '../shared/services/search.service';
import { PicoSearchQuery } from '../shared/models/search-params';
import { SearchResult } from '../shared/models/search-result';
import { MOCK_SEARCH_RESULTS, MOCK_SELECTED_TITLES } from '../shared/mock-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
    searchResults!: SearchResult[];
    currentConfig!: SessionConfig;
    wasSearchClicked: boolean = false;
    errorMessage: string | undefined ;

    //TODO: Remove for prod
    devMode = false;

    constructor(private configService: ConfigHandlerService,
        private searchService: SearchService
    ) {}
    //TODO: Remove for prod
    toggleDevMode() {
        this.devMode = !this.devMode;
    }

    ngOnInit(): void {
        this.configService.config$.subscribe((config) => {
            this.currentConfig = config;
        })
    }

    startPicoSearch(input: PicoSearchQuery) {
        this.wasSearchClicked = true;
        localStorage.setItem("picoSearchQuery", JSON.stringify(input));
        this.configService.updateSearchResultAvailabilityStatus(false);

        if(!this.devMode) {
            this.searchService.sendPicoSearchParams(input)
            .subscribe({
                next: data => {
                    this.searchResults = JSON.parse(data as string) as SearchResult[];
                    this.configService.updateSearchResultAvailabilityStatus(true);
                    this.errorMessage = undefined;
                },
                error: error => {
                    this.errorMessage = error.message;
                    console.log({error});
                }
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

    uploadAllPapers() {
        // let selectedTitles = [];

        // for(let searchResult of this.searchResults) {
        //     selectedTitles.push(searchResult.title)
        // }
        localStorage.setItem("selectedTitles", JSON.stringify(MOCK_SELECTED_TITLES))
        window.location.href += '/phase-two'
    }
}
