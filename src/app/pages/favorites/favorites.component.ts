import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FavoriteIconComponent } from '../../components/favorite-icon/favorite-icon.component';
import { ICharacters } from '../../interface/ICharacters';
import { CharactersService } from '../../services/characters.service';
import { FavoritesService } from '../../services/favorites.service';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    FavoriteIconComponent,
    AsyncPipe,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  //lista de favoritos
  favorites = signal<ICharacters[]>([]);

  favoritesService = inject(FavoritesService);
  charactersService = inject(CharactersService);

  ngOnInit(): void {
    //inicia a lista de favoritos
    this.load()
  }

  load() {
    //caso tenha algum, baixa e adiciona na lsita de favoritos
    if (this.favoritesService.favorites().length > 0) {
      this.charactersService.getCharactersByIds(this.favoritesService.favorites())
      .subscribe(res => this.favorites.set(res));
    } else {
      //caso constrário, seta a lista de favoritos como vazia
      this.favorites.set([]);
    }
  }

  removeFromFavorites(character: ICharacters) {
    this.favoritesService.toggleFavorite(character.id);
    this.load();
  }
}