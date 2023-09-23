import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
})
export class ProblemComponent {
  @Input() name!: string;
  @Input() difficulty!: number;
  @Input() tags!: string[];
  @Input() id!: string;
  @Input() contestId!: string;
  link = 'https://codeforces.com/problemset/problem/';
}
