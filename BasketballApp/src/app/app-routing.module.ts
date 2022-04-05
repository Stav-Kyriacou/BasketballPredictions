import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { PlayerComponent } from './components/player/player.component';


const appRoutes: Routes = [
  { path: 'player', component: PlayerComponent },
  { path: 'create-team', component: CreateTeamComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




// routing / team name / work with server-send to db