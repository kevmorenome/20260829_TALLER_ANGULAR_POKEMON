import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { typeColor, typeLabel } from '../../utils/type-colors';

const STAT_LABELS: Record<string, string> = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent {
  @Input({ required: true }) pokemon!: Pokemon;
  @Output() close = new EventEmitter<void>();

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

  get headerColor(): string {
    return typeColor(this.pokemon.types[0]?.type.name ?? 'normal');
  }

  statLabel(name: string): string {
    return STAT_LABELS[name] ?? name;
  }

  statPercent(value: number): number {
    return Math.min(100, Math.round((value / 200) * 100));
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
