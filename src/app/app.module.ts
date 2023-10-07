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
import { ProblemSetComponent } from './components/problem-set/problem-set.component';
import { MyProblemsComponent } from './components/my-problems/my-problems.component';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from './state';
import { TodoProblemComponent } from './components/todo-problem/todo-problem.component';
import { ProblemListDateComponent } from './components/problem-list-date/problem-list-date.component';
import { ObjToArrayPipe } from './pipes/obj-to-array.pipe';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';

const routes: Routes = [
  {
    path: '',
    component: ProblemSetComponent,
    title: 'ProblemSet',
  },
  {
    path: 'my-problems',
    component: MyProblemsComponent,
    title: 'MyProblems',
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
    ProblemSetComponent,
    MyProblemsComponent,
    TodoProblemComponent,
    ProblemListDateComponent,
    ObjToArrayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      todosState: todosReducer,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
