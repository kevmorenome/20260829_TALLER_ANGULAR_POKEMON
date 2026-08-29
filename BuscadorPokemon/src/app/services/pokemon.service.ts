import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  /** Busca un pokémon por nombre o número (id). */
  getPokemon(query: string): Observable<Pokemon> {
    const term = query.trim().toLowerCase();
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${term}`);
  }

  /** Obtiene la lista inicial de pokémon (para mostrar sugerencias). */
  getPokemonList(limit = 12): Observable<{ results: { name: string; url: string }[] }> {
    return this.http.get<{ results: { name: string; url: string }[] }>(
      `${this.baseUrl}/pokemon?limit=${limit}&offset=0`,
    );
  }
}
