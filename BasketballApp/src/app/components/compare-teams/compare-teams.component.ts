import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';
import { SelectPlayer, AddPlayer } from '../edit-team/edit-team.component';
import { PlayerTableComponent } from '../player-table/player-table.component';

@Component({
  selector: 'app-compare-teams',
  templateUrl: './compare-teams.component.html',
  styleUrls: ['./compare-teams.component.css']
})
export class CompareTeamsComponent implements OnInit {
  teams: Team[] = [];
  teamAId: number;
  teamBId: number;
  winRate: number = 50;
  generated: boolean = true;
  showWinRate: boolean = false;

  constructor(
    private _teamService: TeamService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams,
      null,
      () => {
        console.log(this.teams);
      });
  }
  onCompare() {
    this.generated = false;
    this._teamService.compareTeams(this.teamAId, this.teamBId).subscribe(result => this.winRate = result, null, () => {
      console.log(this.winRate);
      this.generated = true;
      this.showWinRate = true;
    });
  }

  onViewTeam(team: Number) {
    let teamToView;

    if (team == 1) {
      if (this.teamAId == null)
        return;
      for (let i = 0; i < this.teams.length; i++) {
        const element = this.teams[i];
        if (element.teamID == this.teamAId) {
          teamToView = element;
          break;
        }
      }
    }
    else if (team == 2) {
      if (this.teamAId == null)
        return;
      for (let i = 0; i < this.teams.length; i++) {
        const element = this.teams[i];
        if (element.teamID == this.teamBId) {
          teamToView = element;
          break;
        }
      }
    }

    const dialogRef = this.dialog.open(ViewTeam, {
      width: '80vw',
      height: '80vh',
      data: teamToView,
    });
  }

  onChangeTeam(event) {
    this.showWinRate = false;

  }
}

// new dialog-box component : view players in team //

@Component({
  selector: 'view-team',
  templateUrl: 'view-team.html',
  styleUrls: ['./view-team.css']
})

export class ViewTeam {
  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;

  constructor(
    public dialogRef: MatDialogRef<SelectPlayer>,
    @Inject(MAT_DIALOG_DATA) public data: Team
  ) { }

  ngAfterViewInit() {
    this.playerTable.setupTable(this.data.players);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

