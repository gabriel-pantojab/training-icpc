import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';
import { ProblemComponent } from './components/problem/problem.component';
import { FilterCodeforcesComponent } from './components/filter-codeforces/filter-codeforces.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [AppComponent, TagComponent, ProblemComponent, FilterCodeforcesComponent, LoadingComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
