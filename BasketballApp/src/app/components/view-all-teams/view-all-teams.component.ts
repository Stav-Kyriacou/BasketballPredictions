import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';
import { PlayerService } from '../../services/player/player.service'
import { ConfirmComponent, ConfirmDialogModel } from '../confirm/confirm.component';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerTableComponent } from '../player-table/player-table.component';
import { SelectPlayer } from '../edit-team/edit-team.component';
import { Player } from 'src/app/models/player/player';

@Component({
  selector: 'app-view-all-teams',
  templateUrl: './view-all-teams.component.html',
  styleUrls: ['./view-all-teams.component.css']
})
export class ViewAllTeamsComponent implements OnInit {
  value: string = '';
  teams: Team[] = [];
  players: Player[] =[];
  teamsLoaded: boolean = false;

  constructor(private _teamService: TeamService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    // Get all Teams data
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams, null, () => {
      this.teamsLoaded = true;
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
        this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
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
@Component({
  selector: 'view-team',
  templateUrl: '../compare-teams/view-team.html',
  styleUrls: ['../compare-teams/view-team.css']
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