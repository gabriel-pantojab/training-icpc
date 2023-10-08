import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProblemAPI } from 'src/app/models/model';
import { LoadingMessagesService } from 'src/app/services/loading-messages/loading-messages.service';
import { ProblemSetService } from 'src/app/services/problem-set/problem-set.service';

@Component({
  selector: 'app-problem-set',
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
