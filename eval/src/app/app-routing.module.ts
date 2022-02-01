import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { UserCreationComponent } from './user-creation/user-creation.component';

const routes: Routes = [
  { path: "characters", component: CharacterDetailsComponent},
  { path: "characters/:id", component: CharacterDetailsComponent},
  { path: "", component: CharacterDetailsComponent},
  { path: "creation", component: UserCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
