import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PicoSearchQuery } from '../../shared/models/search-params';

@Component({
  selector: 'app-keyword-search-bars',
  templateUrl: './keyword-search-bars.component.html',
  styleUrl: './keyword-search-bars.component.css'
})
export class KeywordSearchBarsComponent {

    picoFormGroup = new FormGroup({
        populationFormControl: new FormControl(''),
        interventionFormControl: new FormControl(''),
        comparisonFormControl: new FormControl(''),
        outcomeFormControl: new FormControl('')
    });

    @Output() onSubmitEvent = new EventEmitter<PicoSearchQuery>();
    private picoSearchQuery!: PicoSearchQuery;

    constructor() {}

    ngOnInit(): void {
        this.picoSearchQuery = {
            population: '',
            intervention: '',
            comparison: '',
            outcome: ''
        };
    }

    onSubmit() {
        this.searchInputParser();
        this.onSubmitEvent.emit(this.picoSearchQuery);
    }

    private searchInputParser() {
        this.picoSearchQuery.population = this.formatKeywordString(this.picoFormGroup.controls.populationFormControl.value!);
        this.picoSearchQuery.intervention = this.formatKeywordString(this.picoFormGroup.controls.interventionFormControl.value!);
        this.picoSearchQuery.comparison = this.formatKeywordString(this.picoFormGroup.controls.comparisonFormControl.value!);
        this.picoSearchQuery.outcome = this.formatKeywordString(this.picoFormGroup.controls.outcomeFormControl.value!);
    }

    private formatKeywordString(input: string) {
        return (input!.split(/[;,]+/))
        .filter((x) => x != '')
        .join(' ');
    }
}
