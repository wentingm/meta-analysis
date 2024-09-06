import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/services/search.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PicoSearchQuery } from '../../shared/models/search-params';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrl: './post-search.component.css'
})
export class PostSearchComponent implements OnInit{

    mockEffectSizeList: {title: string, effectSize: number}[] = [
       {title: "Cognitive E-learning in Preschool", effectSize: 0.6397725657355339},
        {title: "Java Sensei Learning Improvement", effectSize: 0.35498900235103537},
        {title: "Cognitive Processes in Preparation for Problem Solving", effectSize: 0.4244309548328089},
        {title: "Adaptive Cytopathology Tutorials", effectSize: -0.33538880771466223},
        {title: "E-Learning Consequences of the Declining Interest in Engineering Studies in Europe", effectSize: -0.011400202533785209},
        {title: "Assessing Teacher Technology Skills", effectSize: 0.10066169597590496},
        {title: "Cognitive Processes in Preparation for Problem Solving", effectSize: -0.2883028703597375},
        {title: "Adaptive Cytopathology Tutorials", effectSize: 0.11288292516111359},
        {title: "Googling for Schools: Do K-12 School Districts Purchase Adwords to Drive Website Traffic?", effectSize: -0.2618307242506062},
    ]

    constructor(private searchService: SearchService,
        private fb: FormBuilder) {}

    areRecommendationAvailable = false;
    selectedTitles!: string[];
    maxPrompts = 7;
    promptInput!: FormGroup;
    promptsFormGroup = this.fb.group({
        prompts: this.fb.array([])
    });
    picoSearchQuery: PicoSearchQuery = JSON.parse(localStorage.getItem('picoSearchQuery')!);

    predefinedPrompts = [
        'Does the article discuss an original structured investigation in the form of experiments, trials, or treatments?',
        'Is this a randomized controlled trials or cohort studies or case-control study',
        'Does this study split participants into groups for comparison',
        'Assessed treatment outcomes after participants interact with ' + this.picoSearchQuery.intervention,
        'Compared' + this.picoSearchQuery.outcome + ' of ' + this.picoSearchQuery.intervention + ' from the experiment group with outcomes from a non-treatment mode from the control/comparison group',
        'Reported sufficient data (larger than 30 sample) to calculate effect size.',
        'Reported measurable outcomes that can be further analyzed.'
    ];

    ngOnInit(): void {
        this.selectedTitles = JSON.parse(localStorage.getItem("selectedTitles")!);
        //add guardrail here to check if no papers were selected
        this.addPrompt();
    }

    filterSelectedPapers() {
        this.areRecommendationAvailable = true;
        this.searchService.sendSelectedTitlesForFiltering(this.selectedTitles).subscribe({
            next: (data) => {
                this.areRecommendationAvailable = true;
                console.log({data});
            },
            error: (err) => {
                console.log({err})
                this.areRecommendationAvailable = false;
            }
        })
    }

    calculateAvgEffectSize(): number {
        let sum = 0
        for (let entry of this.mockEffectSizeList) {
            sum += entry.effectSize as unknown as number;
        }

        return sum/this.mockEffectSizeList.length;
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
