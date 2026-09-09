import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Pokemon {
  name: string;
  image: string;
  type: string;
}


@Component({
  selector: 'app-buscador-pokemon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscador-pokemon.component.html',
  styleUrl: './buscador-pokemon.component.css'
})



export class BuscadorPokemonComponent {
  nombrePokemonInput = signal('');
  pokemon = signal<Pokemon | null>(null);
  mensajeError = signal<string | null>(null);

  async buscarPokemon() {
    const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();
    if (!nombrePokemon) return;
    this.mensajeError.set(null);

    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
      if (!respuesta.ok) {
        throw new Error('No se encontró el Pokemon!');
      }

      const datos = await respuesta.json();
      this.pokemon.set({
        name: datos.name.toUpperCase(),
        image: datos.sprites.front_default,
        type: datos.types.map((typeInfo: any) => typeInfo.type.name).join(', ')
      });

    } catch (error: any) {
      this.pokemon.set(null);
      this.mensajeError.set(error.message);
    }

  }
}
