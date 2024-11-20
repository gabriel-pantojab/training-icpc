import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProblemAPI } from 'src/app/models/model';
import { LoadingMessagesService } from 'src/app/services/loading-messages/loading-messages.service';
import { ProblemSetService } from 'src/app/services/problem-set/problem-set.service';
import { SearchProblemComponent } from '../search-problem/search-problem.component';
import { FilterCodeforcesComponent } from '../filter-codeforces/filter-codeforces.component';
import { ProblemComponent } from '../problem/problem.component';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-problem-set',
  standalone: true,
  imports: [
    NgStyle,
    SearchProblemComponent,
    FilterCodeforcesComponent,
    ProblemComponent,
    LoadingComponent,
  ],
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css'],
})
export class ProblemSetComponent implements OnInit {
  title = 'Problem Set';
  loadingMessage = '';
  constructor(
    public problemSetService: ProblemSetService,
    public loadingMessageService: LoadingMessagesService
  ) {
    this.loadingMessageService.cycleMessages().subscribe((message) => {
      this.loadingMessage = message;
    });
  }

  ngOnInit() {
    if (this.problemSetService.renderProblems()?.length === 0)
      this.problemSetService.loadDefaultProblems();
  }

  setProblems(problems: ProblemAPI[] | null) {
    this.problemSetService.setProblems(problems);
  }

  nextPage() {
    this.problemSetService.nextPage();
  }

  prevPage() {
    this.problemSetService.prevPage();
  }
}
