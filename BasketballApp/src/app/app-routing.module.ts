import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { PlayerComponent } from './components/player/player.component';
import { SaveCheckGuard } from './guards/save-check.guard';


const appRoutes: Routes = [
  { path: '', component: PlayerComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'create-team', component: CreateTeamComponent },
  { path: 'edit-team/:teamID', component: EditTeamComponent, canDeactivate: [SaveCheckGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// routing / team name / work with server-send to db