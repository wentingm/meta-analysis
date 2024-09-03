import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { KeywordSearchBarsComponent } from './keyword-search-bars/keyword-search-bars.component';
import { ConfigHandlerService } from '../shared/services/config-handler.service';
import { SearchService } from '../shared/services/search.service';
import { PostSearchComponent } from './post-search/post-search.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchResultsComponent,
    KeywordSearchBarsComponent,
    PostSearchComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    SearchService
  ]
})
export class HomePageModule { }
