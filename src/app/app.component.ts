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
  tagList: string[] = [];
  filterForm: FormGroup;

  constructor(private codeforcesService: CodeforcesService) {
    this.filterForm = new FormGroup({
      minDifficulty: new FormControl(800),
      maxDifficulty: new FormControl(3600),
      tag: new FormControl(''),
    });
    this.filterForm.get('tag')?.valueChanges.subscribe((value) => {
      if (value && !this.tagList.includes(value)) {
        this.tagList.push(value);
        this.filterForm.get('tag')?.setValue('');
      }
    });
  }

  onSubmit(event: Event) {}

  removeTag(tag: string) {
    this.tagList = this.tagList.filter((t) => t !== tag);
  }
}
