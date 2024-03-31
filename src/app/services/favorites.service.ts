import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites = signal<number[]>([]);
// recebe o id como parametro para alternar
  toggleFavorite(characterId: number) {
    // verificar se ja possui o id na lista
    if (this.favorites().includes(characterId)) {
      const index = this.favorites().findIndex((id) => id === characterId);
      // se ja esta na lista remove
      this.favorites.update(ids => {
        ids.splice(index, 1);
        return [...ids]
      });
      // se não estiver, adiciono
    } else {
      this.favorites.update((state) => [...state, characterId]);
    }
  }

}



