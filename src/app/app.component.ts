import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CodeforcesService } from './services/codeforces.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'random-problem';
  filterForm: FormGroup;
  constructor(private codeforcesService: CodeforcesService) {
    this.filterForm = new FormGroup({
      minDifficulty: new FormControl(800),
      maxDifficulty: new FormControl(3600),
      tag: new FormControl(''),
    });
  }

  onSubmit(event: Event) {}
}
