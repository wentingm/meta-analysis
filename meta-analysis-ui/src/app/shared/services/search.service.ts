import { Injectable } from '@angular/core';
import { MOCK_SEARCH_RESULTS } from '../mock-data';
import { PicoSearchQuery } from '../models/search-params';
import { Observable, of } from 'rxjs';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor() { }

    sendPicoSearchParams(searchParams: PicoSearchQuery) {
        //TODO: Launch and connect with the backend and, send the searchParams
    }

    fetchSearchResults(): Observable<SearchResult[]> {
      return of(MOCK_SEARCH_RESULTS);
    }
}
