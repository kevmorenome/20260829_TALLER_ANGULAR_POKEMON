import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() loading = false;
  @Output() search = new EventEmitter<string>();

  query = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    const term = this.query.trim();
    if (term.length === 0) {
      return;
    }
    this.search.emit(term);
  }
}
