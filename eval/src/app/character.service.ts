import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from './models/character';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Character[]> {
    return this.http.get<Character[]>(`${environment.URL}/characters`)
  }

  create(character: Character): Observable<Character> {
    return this.http.post<Character>(`${environment.URL}/characters`, character);
  }

  delete(id: number): Observable<Character> {
    return this.http.delete<Character>(`${environment.URL}/characters/${id}`)
  }

  update(character: Character): Observable<Character> {
    return this.http.put<Character>(`${environment.URL}/characters/${character.id}`, character);
  }
}
