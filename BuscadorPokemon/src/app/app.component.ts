import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './models/pokemon.model';
import { SearchComponent } from './components/search/search.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchComponent, PokemonCardComponent, PokemonDetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  results: Pokemon[] = [];
  selected: Pokemon | null = null;
  loading = false;
  error = '';
  hasSearched = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadInitial();
  }

  /** Carga algunos Pokémon populares al iniciar. */
  private loadInitial(): void {
    this.loading = true;
    this.pokemonService.getPokemonList(12).subscribe({
      next: (list) => {
        const requests = list.results.map((r) => this.pokemonService.getPokemon(r.name));
        forkJoin(requests).subscribe({
          next: (pokemons) => {
            this.results = pokemons;
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSearch(term: string): void {
    this.loading = true;
    this.error = '';
    this.hasSearched = true;
    this.pokemonService.getPokemon(term).subscribe({
      next: (pokemon) => {
        this.results = [pokemon];
        this.loading = false;
      },
      error: () => {
        this.results = [];
        this.error = `No se encontró ningún Pokémon con "${term}". Intenta con otro nombre o número.`;
        this.loading = false;
      },
    });
  }

  onSelect(pokemon: Pokemon): void {
    this.selected = pokemon;
  }

  onCloseDetail(): void {
    this.selected = null;
  }
}
