import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICharacters } from '../interface/ICharacters';
import { map } from 'rxjs';

const BASE_URL = "https://rickandmortyapi.com/api";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _httpClient = inject(HttpClient);

  getCharacters() {
    return this._httpClient.get<ICharacters[]>(`${BASE_URL}/character`).pipe(
      map((res: any) => res.results)
    );
  }

  getCharactersByName(name: string) {
    return this._httpClient.get<ICharacters[]>(`${BASE_URL}/character?name=${name}`).pipe(
      map((res: any) => res.results)
    );
  }
  
  getCharactersByIds(ids: number[]) {
    return this._httpClient.get<ICharacters[]>(`${BASE_URL}/character/[${ids.toString()}]`);
  }
}
