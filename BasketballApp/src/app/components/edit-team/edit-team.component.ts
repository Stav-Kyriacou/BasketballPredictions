import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import { PlayerService } from 'src/app/services/player.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerTableComponent } from '../player-table/player-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from 'src/app/services/team/team.service';
import { ComponentCanDeactivate } from 'src/app/interfaces/component-can-deactivate';
import { Observable } from 'rxjs';

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
export class EditTeamComponent implements OnInit, ComponentCanDeactivate {
  teamID: number;
  playerList: Player[] = [];
  saving: boolean = false;
  saved: boolean = true;

  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _teamService: TeamService,
    private _playerService: PlayerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return this.saved;
  }

  ngOnInit() {
    // get team ID from URL
    this.route.paramMap.subscribe(params => { this.teamID = Number(params.get("teamID")) })

    // Get team data from API using teamID
    this._teamService.getATeam(this.teamID).subscribe(unpackedTeams => team = unpackedTeams,
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
    if (selectedPlayers.length <= 0) return;

    //Remove all selected players from the current team
    team.players = team.players.filter(function (player) {
      return !selectedPlayers.includes(player);
    });
    this.saved = false;
    this.playerTable.selection.clear();
    this.playerTable.setupTable(team.players);
  }

  saveTeam() {
    if (this.saved) return;
    this.saving = true;
    this._teamService.saveATeam(team).subscribe(value => value,
      () => {
        // this.router.navigate(["create-team"]);
        this.saving = false;
        this.saved = true;
        this._snackBar.open("Team Saved!", "Okay", { duration: 3000 })
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
      if (result.event > 0) {
        this.saved = false;
      }
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
    let selectedPlayers = this.playerTable.selection.selected;
    if (selectedPlayers.length === 0) return;

    let playersAdded = 0;
    let duplicatePlayers = 0;
    let message = "";

    if (team.players == null) {
      team.players = [];
    }

    selectedPlayers.forEach(player => {
      if (team.players.some(p => p.playerID === player.playerID)) {
        duplicatePlayers++;
      } else {
        team.players.push(player);
        playersAdded++;
      }
    });
    if (playersAdded > 0 && duplicatePlayers > 0) {
      message = "Players have been added, list contained some duplicate players";
    } else if (playersAdded === 0 && duplicatePlayers > 0) {
      message = "Can't add duplicate players";
    } else if (playersAdded > 0 && duplicatePlayers === 0) {
      message = "Players have been added to team";
    }

    this._snackBar.open(message, 'Okay', {
      duration: 3000
    });

    this.dialogRef.close({ event: playersAdded });
  }
}