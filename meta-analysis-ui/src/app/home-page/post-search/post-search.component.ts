import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrl: './post-search.component.css'
})
export class PostSearchComponent implements OnInit{

    constructor(private searchService: SearchService,
        private fb: FormBuilder) {}

    areRecommendationAvailable = false;
    selectedTitles!: string[];
    maxPrompts = 7;
    promptInput!: FormGroup;
    promptsFormGroup = this.fb.group({
        prompts: this.fb.array([])
    });

    ngOnInit(): void {
        this.selectedTitles = JSON.parse(localStorage.getItem("selectedTitles")!);
        //add guardrail here to check if no papers were selected
        this.addPrompt();
    }

    filterSelectedPapers() {
        this.areRecommendationAvailable = true;
        // this.searchService.sendSelectedTitlesForFiltering(this.selectedTitles).subscribe({
        //     next: (data) => {
        //         this.areRecommendationAvailable = true;
        //     },
        //     error: (err) => {
        //         console.log({err})
        //         this.areRecommendationAvailable = false;
        //     }
        // })
    }

    get prompts(): FormArray {
        return this.promptsFormGroup.get('prompts') as FormArray;
    }

    addPrompt() {
        const promptInput = this.fb.group({
            prompt: ''
        })
        this.prompts.push(promptInput);
    }

    removePrompt(idx: number) {
        this.prompts.removeAt(idx)
    }
}
