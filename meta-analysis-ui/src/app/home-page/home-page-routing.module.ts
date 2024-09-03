import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { PostSearchComponent } from './post-search/post-search.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'phase-two', component: PostSearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
