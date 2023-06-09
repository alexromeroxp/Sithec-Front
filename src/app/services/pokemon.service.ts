import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';

  constructor(private http: HttpClient) { }

  getPokemonList() {
    return this.http.get(this.apiUrl);
  }

  getPokemonListOffset(url:string) {
    return this.http.get(url);
  }

  getPokemonDetail(url:string) {
    return this.http.get(url);
  }

}
