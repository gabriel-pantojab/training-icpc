import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  templateUrl: './problem-tag.component.html',
  styleUrls: ['./problem-tag.component.css'],
})
export class TagComponent {
  @Input() name!: string;
  @Output() removeEvent = new EventEmitter<string>();

  removeTag(tag: string) {
    this.removeEvent.emit(tag);
  }
}
