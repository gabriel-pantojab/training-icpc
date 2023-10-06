import { Component, Input } from '@angular/core';
import { Problem } from 'src/app/models/model';

@Component({
  selector: 'app-todo-problem',
  templateUrl: './todo-problem.component.html',
  styleUrls: ['./todo-problem.component.css'],
})
export class TodoProblemComponent {
  @Input() problem!: Problem;
}
