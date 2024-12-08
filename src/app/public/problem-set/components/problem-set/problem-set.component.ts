import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ProblemAPI } from '@/models/model';
import { LoadingMessagesService } from '@/services/loading-messages/loading-messages.service';
import { ProblemSetService } from '@/services/problem-set/problem-set.service';

import { FilterCodeforcesComponent } from '../filter-codeforces/filter-codeforces.component';
import { ProblemComponent } from '../problem/problem.component';


import { SearchProblemComponent } from '../search-problem/search-problem.component';
import { LoadingComponent } from '@shared/ui/components';

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
  providers: [ProblemSetService, LoadingMessagesService],
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
