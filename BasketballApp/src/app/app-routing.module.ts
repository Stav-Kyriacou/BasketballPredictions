import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewTeamComponent } from './components/create-new-team/create-new-team.component';
import { ViewAllTeamsComponent } from './components/view-all-teams/view-all-teams.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { PlayerComponent } from './components/player/player.component';
import { SaveCheckGuard } from './guards/save-check.guard';


const appRoutes: Routes = [
  { path: '', component: PlayerComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'create-team', component: ViewAllTeamsComponent },
  { path: 'create-new-team', component: CreateNewTeamComponent },
  { path: 'edit-team/:teamID', component: EditTeamComponent, canDeactivate: [SaveCheckGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// routing / team name / work with server-send to db
