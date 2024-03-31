import { Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ICharacters } from '../../interface/ICharacters';
import { CharactersService } from '../../services/characters.service';

import { CommonModule } from '@angular/common';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { FavoriteIconComponent } from '../../components/favorite-icon/favorite-icon.component';
import { FavoritesService } from '../../services/favorites.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FavoriteIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public results=  signal<ICharacters[]>([]);

  // input da pesquisa
  input = new FormControl<any>('')

  // favoritos para controlar o icone de favoritar
  favoriteIds = this._favoritesService.favorites;

  constructor(
    private _charactersService: CharactersService,
    private _favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
    //carrega todos inicialmente
    this.load();

    //conforme digita, faz a pesquisa tratando utilizando alguns pipes
    this.input.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),

      //aqui troca o termo digitado pela pesquisa na api
      switchMap(term => this.search(term)),
    ).subscribe(res => {

      //atualiza os valores
      this.results.update(next => res);
    });
  }

  load() {
    this._charactersService.getCharacters().subscribe(res => this.results.set(res));
  }

  //função que retorna personagens pelo nome e caso dê erro, retorna um array vazio para mostrar msg no html
  search(term: string) {
    return this._charactersService.getCharactersByName(term).pipe(
      catchError(error => of([])
    ));
  }

  //adiciona nos favoritos
  addToFavorites = (character: ICharacters) => this._favoritesService.toggleFavorite(character.id);
  
}