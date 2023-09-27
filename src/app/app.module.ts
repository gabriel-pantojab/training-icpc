import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';
import { ProblemComponent } from './components/problem/problem.component';
import { FilterCodeforcesComponent } from './components/filter-codeforces/filter-codeforces.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
  },
  {
    path: '/my-problems',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TagComponent,
    ProblemComponent,
    FilterCodeforcesComponent,
    LoadingComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
