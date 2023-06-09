import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { OfflineServiceService } from 'src/app/services/offline-service.service';

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
    pokemons: any;
    pokemon: any;
    favorites: any;
    showDialog: boolean = false;
    showDialogFavorite: boolean = false;
    responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(private pokemonService: PokemonService, private offlineService: OfflineServiceService) { }

    async ngOnInit() {
        this.favorites = await this.offlineService.getFavorites();
        console.log(this.favorites);
        this.pokemonService.getPokemonList().subscribe((result: any) => {
            this.pokemons = result;
            this.pokemons.results = result.results.map((pokemon: any) => {
                let index = this.favorites.findIndex((name: string) => name === pokemon.name);
                index > -1 ? pokemon.favorite = true : pokemon.favorite = false;
                return pokemon
            });
        });
    }

    loadPreviousOrNextPokemons(url: string) {
        this.pokemonService.getPokemonListOffset(url).subscribe((result: any) => {
            this.pokemons = result;
            this.pokemons.results = result.results.map((pokemon: any) => {
                let index = this.favorites.findIndex((name: string) => name === pokemon.name);
                index > -1 ? pokemon.favorite = true : pokemon.favorite = false;
                return pokemon
            });
        });
        
    }

    onRowSelect(event: any) {
        this.pokemonService.getPokemonDetail(event.data.url).subscribe((result: any) => {
            this.pokemon = {
                ...result,
                images: Object.values(result.sprites).filter(url => url !== null && typeof url === 'string'),
            }
            console.log(this.pokemon)
            this.showDialog = true;
        });
    }

    addToFavorites(pokemon: any) {
        pokemon.favorite = true;
        this.offlineService.addFavorite(pokemon.name);
        this.favorites.push(pokemon.name)
    }

    deleteFavorite(pokemon: any) {
        pokemon.favorite = false;
        this.offlineService.deleteFavorite(pokemon.name);
        let indexPokemon = this.favorites.findIndex((pokemonName: string) => pokemonName === pokemon.name)
        this.favorites.splice(indexPokemon,1);
    }

    getFavorites(){
        return this.favorites;
    }

}
