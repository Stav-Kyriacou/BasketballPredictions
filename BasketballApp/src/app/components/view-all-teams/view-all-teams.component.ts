import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';
import { ConfirmComponent, ConfirmDialogModel } from '../confirm/confirm.component';
import { Player } from 'src/app/models/player/player';
import { ViewTeamPlayersComponent } from '../view-team-players/view-team-players.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-view-all-teams',
  templateUrl: './view-all-teams.component.html',
  styleUrls: ['./view-all-teams.component.css']
})
export class ViewAllTeamsComponent implements OnInit {
  value: string = '';
  teams: Team[] = [];
  players: Player[] = [];
  teamsLoaded: boolean = false;
  selectedTeam: Team;
  userId: string;
  localTeams: Team[] = [];

  constructor(private _teamService: TeamService, private router: Router, public dialog: MatDialog, public auth: AuthService) { }

  ngOnInit() {
    // Get all Teams data
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams, null, () => {
      this.auth.getUser().subscribe(data => this.userId = data.sub, null, () => {
        this.localTeams = this.teams.filter(team => team.userID === this.userId);
        this.teams = this.teams.filter(team => team.userID !== this.userId);
        this.teamsLoaded = true;
      })
    });
  }

  onViewTeam(id: number, localTeams: boolean) {
    let teamList: Team[] = [];
    if (localTeams) {
      teamList = this.localTeams;
    }
    else {
      teamList = this.teams;
    }

    let teamToView;
    if (id == null)
      return;
    for (let i = 0; i < teamList.length; i++) {
      const element = teamList[i];
      if (element.teamID == id) {
        teamToView = element;
        break;
      }
    }
    const dialogRef = this.dialog.open(ViewTeamPlayersComponent, {
      width: '80vw',
      height: '80vh',
      data: teamToView,
    });
  }
  // navigate to edit-team page with the team ID as the last /
  editTeam(team: number) {
    this.router.navigate(["edit-team", team]);
  }
  //deletes a team by their ID from API
  deleteTeam(TeamID: number) {
    this._teamService.deleteTeam(TeamID).subscribe(data => data,
      () => {
        this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams, null, () => {
          this.localTeams = this.teams.filter(team => team.userID === this.userId);
          this.teams = this.teams.filter(team => team.userID !== this.userId);
        });
      });
  }
  confirmDialog(TeamID: number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Deleting Team", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.deleteTeam(TeamID)
      }
    });
  }
}
