import { Injectable } from '@angular/core';
import { PicoSearchQuery } from '../models/search-params';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    private backendURL!: string;
    private httpHeader!: HttpHeaders;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.backendURL = 'http://20.9.141.201:5000/process_json';
    }

    sendPicoSearchParams(searchParams: PicoSearchQuery) {
        //TODO: Launch and connect with the backend and, send the searchParams
        return this.httpClient.post(this.backendURL, searchParams);
    }
}
