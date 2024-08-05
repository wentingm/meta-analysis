import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{

    searchBarFormControl = new FormControl('');
    keywords: string[] = [];

    constructor() {}

    ngOnInit(): void {
    }

    searchInputParser(input: string) {

    }
}
