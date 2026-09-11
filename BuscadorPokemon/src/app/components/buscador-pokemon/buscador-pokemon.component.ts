import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common'
import { PokemonStorageService, PokemonTarjeta } from '../../services/pokemon-storage.service';
import { ResaltarTarjeta } from '../../directives/resaltar-tarjeta.directive';



@Component({
  selector: 'app-buscador-pokemon',
  standalone: true,
  imports: [FormsModule, NgClass, NgStyle, ResaltarTarjeta],
  templateUrl: './buscador-pokemon.component.html',
  styleUrl: './buscador-pokemon.component.css'
})



export class BuscadorPokemonComponent {

  pokemonService = inject(PokemonStorageService);

  nombrePokemonInput = signal('');
  pokemon = signal<PokemonTarjeta | null>(null);
  mensajeError = signal<string | null>(null);
  cargando = signal(false);

  buscarPokemon() {
    const nombrePokemon = this.nombrePokemonInput().trim().toLowerCase();
    if (!nombrePokemon) return;
    this.cargando.set(true)
    this.mensajeError.set(null);

    this.pokemonService.buscarEnAPI(nombrePokemon).subscribe({
      next: (res) => {
        this.pokemon.set({
          id: res.id,
          name: res.name.toUpperCase(),
          img: res.sprites.front_default,
          type: res.types[0].type.name,
          baseExperience: res.base_experience,
          esFavorito: false
        });
        this.cargando.set(false);
      }, error:() => {
        this.pokemon.set(null);
        this.mensajeError.set('Ojito, Pokemon no encontrado');
        this.cargando.set(false);
      }
    });

  }

  guardarEnEquipo() {
    const poke = this.pokemon();


    if(poke){
      this.pokemonService.guardarPokemon(poke);
      alert(`${poke.name} agregado al almacenamiento exitosamente`);
      this.pokemon.set(null);
      this.nombrePokemonInput.set('');
    }

  }
}
