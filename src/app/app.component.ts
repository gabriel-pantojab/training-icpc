import { Component, OnInit } from '@angular/core';
import { CodeforcesService } from './services/codeforces.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'random-problem';

  constructor(private codeforcesService: CodeforcesService) {}

  ngOnInit(): void {
    this.codeforcesService
      .getProblemsByTagsAndDifficulty({
        tags: ['implementation'],
        minDifficulty: 1000,
        maxDifficulty: 1500,
      })
      .then((problems) => {
        console.log(problems);
      });
  }
}
