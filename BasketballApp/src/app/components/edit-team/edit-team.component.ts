import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import { PlayerService } from 'src/app/services/player.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerTableComponent } from '../player-table/player-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AddPlayer {
  playerList: Player[];
  team: Team;
}

let team: Team;

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  teamID: number;
  playerList: Player[] = [];

  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;

  constructor(private router: Router, private route: ActivatedRoute, private _playerService: PlayerService, public dialog: MatDialog) { }

  ngOnInit() {
    // get team ID from URL
    this.route.paramMap.subscribe(params => { this.teamID = Number(params.get("teamID")) })

    // Get team data from API using teamID
    this._playerService.getATeam(this.teamID).subscribe(unpackedTeams => team = unpackedTeams,
      error => console.log("Error" + error),
      () => {
        this.playerTable.setupTable(team.players);
      });

    // Get all players
    this._playerService.getAllPlayers().subscribe(unpackedPlayers => this.playerList = unpackedPlayers,
      error => console.log("Error" + error));
  }

  removePlayers() {
    let selectedPlayers = this.playerTable.selection.selected;

    //Remove all selected players from the current team
    team.players = team.players.filter(function (player) {
      return !selectedPlayers.includes(player);
    });

    this.playerTable.setupTable(team.players);
  }

  saveTeam() {
    this._playerService.saveATeam(team).subscribe(value => value,
      () => {
        this.router.navigate(["create-team"]);
      });
  }

  addplayers(): void {
    const dialogRef = this.dialog.open(SelectPlayer, {
      width: '60vw',
      height: '600px',
      data: { playerList: this.playerList },
    })
    dialogRef.afterClosed().subscribe(result => {
      this.playerTable.setupTable(team.players);
    });
  }
}

@Component({
  selector: 'select-player',
  templateUrl: 'select-player.html',
  styleUrls: ['./select-player.css']
})
export class SelectPlayer {
  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;

  constructor(
    public dialogRef: MatDialogRef<SelectPlayer>,
    @Inject(MAT_DIALOG_DATA) public data: AddPlayer,
    private _snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.playerTable.setupTable(this.data.playerList);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewPlayers() {
    if (team.players == null) {
      team.players = [];
    }

    this.playerTable.selection.selected.forEach(player => {
      team.players.push(player);
    });

    if (this.playerTable.selection.selected.length > 0) {
      this._snackBar.open("Players have been added to the team", 'Okay', {
        duration: 3000
      });
    }

    this.dialogRef.close();
  }
}