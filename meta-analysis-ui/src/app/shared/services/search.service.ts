import { Injectable } from '@angular/core';
import { MOCK_SEARCH_RESULTS } from '../mock-data';
import { PicoSearchQuery } from '../models/search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor() { }

    sendPicoSearchParams(searchParams: PicoSearchQuery) {

        this.fetchSearchResults();
    }

    fetchSearchResults() {
      return MOCK_SEARCH_RESULTS;
    }
}
