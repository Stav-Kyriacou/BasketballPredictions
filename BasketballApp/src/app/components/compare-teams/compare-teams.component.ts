import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import { SelectPlayer, AddPlayer } from '../edit-team/edit-team.component';
import { TeamService } from 'src/app/services/team/team.service';
import { PlayerTableComponent } from '../player-table/player-table.component';
export interface DialogData{
  teamList: Team[]
  teamId: number;
}

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
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams,
      null,
      () => {

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
  ViewAllTeams(teamA:boolean): void {
    const dialogRef = this.dialog.open(ViewTeam, {
      width: '60vw',
      height: '600px',
      data:this.teams,
    })
    dialogRef.afterClosed().subscribe(result => {
      // check what team is changing
      if(teamA){
        this.teamA = result;
      }else{
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
  }
}

// new dialog-box component : view players in team //

@Component({
  selector: 'view-team',
  templateUrl: 'view-team.html',
  styleUrls: ['./view-team.css']
})

export class ViewTeam {
  constructor(
    public dialogRef: MatDialogRef<ViewTeam>,
    @Inject(MAT_DIALOG_DATA) public data: Team[]

  ) { }

  ngAfterViewInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

