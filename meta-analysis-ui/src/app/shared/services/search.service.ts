import { Injectable } from '@angular/core';
import { PicoSearchQuery } from '../models/search-params';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private baseURL!: string;
    private httpHeader!: HttpHeaders;

    filterData: Filter[] = [];

    constructor(private httpClient: HttpClient, private router: Router) {
        this.baseURL = 'https://backendapi-gxa9frakd5g4ejew.eastus-01.azurewebsites.net';
    }

    sendPicoSearchParams(searchParams: PicoSearchQuery) {
        return this.httpClient.post(this.baseURL + '/process_json', searchParams);
    }

    sendSelectedTitlesForFiltering(selectedTitles: string[]) {

        const picoSearchQuery: PicoSearchQuery = JSON.parse(localStorage.getItem("picoSearchQuery")!)
        const population = picoSearchQuery.population;
        const intervention = picoSearchQuery.intervention;
        const comparison = picoSearchQuery.comparison;
        const outcome = picoSearchQuery.outcome;

        for(let title of selectedTitles) {
            this.filterData.push({
                title: title,
                population: population,
                intervention: intervention,
                comparison: comparison,
                outcome: outcome

            })
        }

        return this.httpClient.post(this.baseURL + '/filters', this.filterData);
    }
}
