import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class OfflineServiceService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

  }

  async addFavorite(pokemonName: string) {
    let currentValue = await this._storage?.get("favorite");
    if(currentValue){
      currentValue.push(pokemonName)
      this.storage.set("favorite", currentValue);
    }else{
      this.storage.set("favorite", [pokemonName]);
    }
  }

  async deleteFavorite(pokemonName: string) {    
    let pokemons = await this.storage.get("favorite");
    let indexPokemon = pokemons.findIndex((pokemon: string) => pokemon === pokemonName)
    pokemons.splice(indexPokemon,1);
    this.storage.set("favorite", pokemons);
  }
  
  async getFavorites() {   
    return await this.storage.get("favorite");
  }
}
