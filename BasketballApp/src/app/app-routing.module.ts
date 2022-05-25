import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewTeamComponent } from './components/create-new-team/create-new-team.component';
import { ViewAllTeamsComponent } from './components/view-all-teams/view-all-teams.component';
import { CompareTeamsComponent } from './components/compare-teams/compare-teams.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { PlayerComponent } from './components/player/player.component';
import { SaveCheckGuard } from './guards/save-check.guard';


const appRoutes: Routes = [
  { path: '', component: PlayerComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'create-new-team', component: CreateNewTeamComponent },
  { path: 'view-teams', component: ViewAllTeamsComponent },
  { path: 'compare-teams', component: CompareTeamsComponent },
  { path: 'edit-team/:teamID', component: EditTeamComponent, canDeactivate: [SaveCheckGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// routing / team name / work with server-send to db
