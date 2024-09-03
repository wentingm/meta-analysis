import { Injectable } from '@angular/core';
import { PicoSearchQuery } from '../models/search-params';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private baseURL!: string;
    private httpHeader!: HttpHeaders;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.baseURL = 'https://backendapi-gxa9frakd5g4ejew.eastus-01.azurewebsites.net';
    }

    sendPicoSearchParams(searchParams: PicoSearchQuery) {
        return this.httpClient.post(this.baseURL + '/process_json', searchParams);
    }

    sendSelectedTitlesForFiltering(selectedTitles: string[]) {
        return this.httpClient.post(this.baseURL + '/filters', selectedTitles);
    }
}
