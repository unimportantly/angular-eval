import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';
import {TableModule} from 'primeng/table';
import { CharacterService } from '../character.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  activesShown: boolean = false;
  inactivesShown: boolean = false;
  characterList :  Character[] = [];
  characters : Character[] = [];
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getAll();
  }

  showActives(): void {
    this.characters = [];
    this.activesShown = true;
    this.inactivesShown = false;
    this.characterList.forEach(character => {
      if(character.active) {
        this.characters.push(character);
      }
    })
  }

  showInactives(): void {
    this.inactivesShown = true;
    this.activesShown = false;
    this.characters = [];
    this.characterList.forEach(character => {
      if(!character.active)
        this.characters.push(character);
    })
  }

  getAll(): void {
    this.characterService.getAll().subscribe({
      next: data => this.characterList = data,
      error: err => console.error(err),
      complete: () => console.log("list updated")
    })
  }

  delete(character: Character) {
    this.characterService.delete(character.id).subscribe({
      next: () => null,
      error: err => console.error(err),
      complete: () => {console.log("character deleted");
      if (this.activesShown === true) {
        this.showActives();
      }
      else { 
        this.showInactives();
      }
    }
    })
  }

  modifyCharacter(character: Character): void {
    this.characterService.update(character).subscribe({
      next: () => character.active = !character.active,
      error: err => console.error(err),
      complete: () => {
        console.log("modified user status");
        if (this.activesShown === true) {
          this.showActives();
        }
        else { 
          this.showInactives();
        }
      }
    })
  }
}
