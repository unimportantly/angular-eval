import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CharacterDetailsComponent } from '../character-details/character-details.component';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  form: FormGroup;
  constructor(private characterService: CharacterService,
     private characterComp: CharacterDetailsComponent) {
    this.form = new FormGroup ({
      title: new FormControl(),
      id: new FormControl(),
      key: new FormControl(),
      name: new FormControl(),
      active: new FormControl()
    })
   }

  ngOnInit(): void {
  }

  createCharacter(): void {
    this.characterService.create(this.form.value).subscribe({
      next: () => null, 
      error: err => console.error(err),
      complete: () => {
        console.log("character created");
        if (this.characterComp.characters[0].active === true) {
          this.characterComp.showActives();
        }
        else if  (!this.characterComp.characters[0].active === true){ 
          this.characterComp.showInactives();
        }
        this.form.setValue({
          title: null,
          id: null,
          key: null,
          name: null,
          active: null,
        })
      }
    })
  }
}
