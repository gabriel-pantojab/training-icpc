import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-icon',
  templateUrl: './search-icon.component.html',
  styleUrls: ['./search-icon.component.css'],
})
export class SearchIconComponent {
  @Input() width?: number = 16;
  @Input() height?: number = 16;
  @Input() color?: string = 'currentColor';
}
