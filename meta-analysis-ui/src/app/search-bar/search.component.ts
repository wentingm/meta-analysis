import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { picoSearchQuery } from '../shared/models/search-params';

//TODO:
// Add required validators
// Empty field warnings/errors
// Add additional filters that take care of only valid alpha-numeric strings as keywords

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchBarComponent implements OnInit{

    picoFormGroup = new FormGroup({
        populationFormControl: new FormControl(''),
        interventionFormControl: new FormControl(''),
        comparisonFormControl: new FormControl(''),
        outcomeFormControl: new FormControl('')
    });
    keywords: picoSearchQuery[] = [];

    constructor() {}

    ngOnInit(): void {
    }

    searchInputParser() {
        // let searchInput = this.searchBarFormControl.value;
        // let potentialKeywords = searchInput!.split(/[;,]+/)

        // this.keywords = potentialKeywords.filter((potentialKeyword) => potentialKeyword != '')
    }
}
