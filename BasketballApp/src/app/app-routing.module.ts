import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewTeamComponent } from './components/create-new-team/create-new-team.component';
import { ViewAllTeamsComponent } from './components/view-all-teams/view-all-teams.component';
import { CompareTeamsComponent } from './components/compare-teams/compare-teams.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { PlayerComponent } from './components/player/player.component';
import { SaveCheckGuard } from './guards/save-check.guard';
import { AuthGuard } from '@auth0/auth0-angular';
import { LandingComponent } from './components/landing/landing.component';


const appRoutes: Routes = [
  { path: '', component: PlayerComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'player', component: PlayerComponent, canActivate: [AuthGuard] },
  { path: 'create-new-team', component: CreateNewTeamComponent, canActivate: [AuthGuard] },
  { path: 'view-teams', component: ViewAllTeamsComponent, canActivate: [AuthGuard] },
  { path: 'compare-teams', component: CompareTeamsComponent, canActivate: [AuthGuard] },
  { path: 'edit-team/:teamID', component: EditTeamComponent, canDeactivate: [SaveCheckGuard], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// routing / team name / work with server-send to db
