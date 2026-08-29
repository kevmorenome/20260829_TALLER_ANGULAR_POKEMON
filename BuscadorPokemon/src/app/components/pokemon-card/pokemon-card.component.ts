import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { typeColor, typeLabel } from '../../utils/type-colors';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
})
export class PokemonCardComponent {
  @Input({ required: true }) pokemon!: Pokemon;
  @Output() select = new EventEmitter<Pokemon>();

  typeColor = typeColor;
  typeLabel = typeLabel;

  get image(): string {
    return (
      this.pokemon.sprites.other?.['official-artwork']?.front_default ??
      this.pokemon.sprites.front_default ??
      ''
    );
  }

  get paddedId(): string {
    return '#' + this.pokemon.id.toString().padStart(3, '0');
  }

  onSelect(): void {
    this.select.emit(this.pokemon);
  }
}
