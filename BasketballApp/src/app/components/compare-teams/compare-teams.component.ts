import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';
import { ViewTeamPlayersComponent } from '../view-team-players/view-team-players.component';


@Component({
  selector: 'app-compare-teams',
  templateUrl: './compare-teams.component.html',
  styleUrls: ['./compare-teams.component.css']
})
export class CompareTeamsComponent implements OnInit {
  teams: Team[] = [];
  teamA: Team;
  teamB: Team;
  winRate: number = 50;
  generated: boolean = true;
  showWinRate: boolean = false;
  loaded: boolean = false;

  constructor(
    private _teamService: TeamService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams,
      null,
      () => {
        this.teams.forEach(team => {
          if (team.players == null) {
            team.players = [];
          }
        });
        console.log(this.teams);
        this.loaded = true;
      });
  }
  onCompare() {
    this.generated = false;
    this._teamService.compareTeams(this.teamA.teamID, this.teamB.teamID).subscribe(result => this.winRate = result, null, () => {
      console.log(this.winRate);
      this.generated = true;
      this.showWinRate = true;
    });
  }

  // open dialog box to change selected team
  ViewAllTeams(teamA: boolean): void {
    const dialogRef = this.dialog.open(ViewTeam, {
      width: '90vw',
      height: '600px',
      data: this.teams,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) return;
      // check what team is changing
      if (teamA) {
        this.teamA = result;
      } else {
        this.teamB = result;
      }
    });
  }
  onViewTeam(team: Number) {
    let teamToView;

    if (team == 1) {
      if (this.teamA.teamID == null)
        return;
      for (let i = 0; i < this.teams.length; i++) {
        const element = this.teams[i];
        if (element.teamID == this.teamA.teamID) {
          teamToView = element;
          break;
        }
      }
    }
    else if (team == 2) {
      if (this.teamA.teamID == null)
        return;
      for (let i = 0; i < this.teams.length; i++) {
        const element = this.teams[i];
        if (element.teamID == this.teamB.teamID) {
          teamToView = element;
          break;
        }
      }
    }
    const dialogRef = this.dialog.open(ViewTeamPlayersComponent, {
      width: '80vw',
      height: '80vh',
      data: teamToView,
    });
  }
}

// new dialog-box component : view players in team //

@Component({
  selector: 'view-team',
  templateUrl: 'view-team.html',
  styleUrls: ['./view-team.css']
})

export class ViewTeam {
  localTeams: Team[];
  teams: Team[];
  userId: string;
  constructor(
    public dialogRef: MatDialogRef<ViewTeam>,
    @Inject(MAT_DIALOG_DATA) public data: Team[],
    public auth: AuthService

  ) { }

  ngAfterViewInit() {
    this.auth.getUser().subscribe(userData => this.userId = userData.sub, null, () => {
      this.localTeams = this.data.filter(team => team.userID === this.userId);
      this.teams = this.data.filter(team => team.userID !== this.userId);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

