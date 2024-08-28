import { Injectable } from '@angular/core';
import { PicoSearchQuery } from '../models/search-params';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { SearchResult } from '../models/search-result';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private backendURL!: string;
    constructor(private httpClient: HttpClient) {
        this.backendURL = 'http://20.9.141.201:5000/process_json';
    }

    sendPicoSearchParams(searchParams: PicoSearchQuery) {
        //TODO: Launch and connect with the backend and, send the searchParams
        return this.httpClient.post(this.backendURL, searchParams).pipe(
            catchError((error) => {
                return of(error);
            })
        );
    }
}
