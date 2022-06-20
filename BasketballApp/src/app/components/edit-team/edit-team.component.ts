import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import { PlayerService } from 'src/app/services/player/player.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerTableComponent } from '../player-table/player-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from 'src/app/services/team/team.service';
import { ComponentCanDeactivate } from 'src/app/interfaces/component-can-deactivate';
import { Observable } from 'rxjs';
import { ConfirmComponent, ConfirmDialogModel } from '../confirm/confirm.component';
import { ResizedEvent } from 'angular-resize-event';

export interface AddPlayer {
  playerList: Player[];
  team: Team;
}

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
  currentTeam: Team;
  teamName: string;
  pageSmall: boolean;

  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;

  constructor(
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
    this._teamService.getATeam(this.teamID).subscribe(unpackedTeams => this.currentTeam = unpackedTeams,
      error => console.log("Error" + error),
      () => {
        this.playerTable.setupTable(this.currentTeam.players);
        this.teamName = this.currentTeam.teamName;
      });

    // Get all players
    this._playerService.getAllPlayers().subscribe(unpackedPlayers => this.playerList = unpackedPlayers,
      error => console.log("Error" + error));
  }

  removePlayers() {
    let selectedPlayers = this.playerTable.selection.selected;
    if (selectedPlayers.length <= 0) return;

    //Remove all selected players from the current team
    this.currentTeam.players = this.currentTeam.players.filter(function (player) {
      return !selectedPlayers.includes(player);
    });
    this.saved = false;
    this.playerTable.selection.clear();
    this.playerTable.setupTable(this.currentTeam.players);
  }

  saveTeam() {
    if (this.saved) return;
    this.saving = true;
    this._teamService.saveATeam(this.currentTeam).subscribe(value => value,
      () => {
        // this.router.navigate(["create-team"]);
        this.saving = false;
        this.saved = true;
        this._snackBar.open("Team Saved!", "Okay", { duration: 3000 })
      });
  }

  addplayers(): void {
    //checks to see if the team player limit has been reached before allowing user to add players
    if(this.currentTeam.players === null || this.currentTeam.players.length < 15 ){
      const dialogRef = this.dialog.open(SelectPlayer, {
        width: '60vw',
        height: '600px',
        data: { playerList: this.playerList, team: this.currentTeam },
      })
      dialogRef.afterClosed().subscribe(result => {
        this.playerTable.setupTable(this.currentTeam.players);
        if (result.event > 0) {
          this.saved = false;
        }
      });
    }
    else{
      const dialogData = new ConfirmDialogModel("Player limit has been reached", "Teams can only have 15 players. You must remove players from your current selection before you can add new players.");

      this.dialog.open(Notification, {
        maxWidth: "400px",
        data: dialogData
      });
    } 
  }

  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Removing Player", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.removePlayers()
      }
    });
  }

  editNameDialog(): void {
    const dialogRef = this.dialog.open(EditTeamName, {
      width: '250px',
      data: { playerList: this.playerList, team: this.currentTeam },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != '' && result != undefined) {
        this.currentTeam.teamName = result;
        this.teamName = this.currentTeam.teamName;
        this.saved = false;
      }
    });
  }

  changeTeamName(teamName: string): void {
    this.currentTeam.teamName = teamName;
  }
  onResize(event: ResizedEvent) {
    if (event.newRect.width < 690) {
      this.pageSmall = true;
    }
    else {
      this.pageSmall = false;
    }
  }
}

// new dialog-box component : select player //

@Component({
  selector: 'select-player',
  templateUrl: 'select-player.html',
  styleUrls: ['./select-player.css']
})
export class SelectPlayer {
  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;
  maxTeamSize: number = 15;

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

    if (this.data.team.players == null) {
      this.data.team.players = [];
    }

    let playersToAdd: Player[] = [];

    selectedPlayers.forEach(player => {
      if (this.data.team.players.some(p => p.playerID === player.playerID)) {
        duplicatePlayers++;
      } else {
        playersToAdd.push(player);
      }
    });

    let playersDiscarded: boolean = false;
    for (let i = 0; i < playersToAdd.length; i++) {
      const player = playersToAdd[i];

      if (this.data.team.players.length < this.maxTeamSize) {
        this.data.team.players.push(player);
        playersAdded++;
      }
      else {
        playersDiscarded = true;
        break;
      }
    }

    if (playersAdded > 0 && playersDiscarded) {
      message = "Players added. Excess players discarded. Can't exceed " + this.maxTeamSize + " players";
    } else if (playersAdded === 0 && playersDiscarded) {
      message = "Team at max size, can't exceed " + this.maxTeamSize + " players";
    } else if (playersAdded > 0 && duplicatePlayers > 0) {
      message = "Players have been added, list contained some duplicate players";
    } else if (playersAdded === 0 && duplicatePlayers > 0) {
      message = "Can't add duplicate players";
    } else if (playersAdded > 0 && duplicatePlayers === 0) {
      message = "Players have been added to team";
    }

    this._snackBar.open(message, 'Okay', {
      duration: 4000
    });

    this.dialogRef.close({ event: playersAdded });
  }
}

@Component({
  selector: 'edit-team-name',
  templateUrl: 'change-team-name.html',
})
export class EditTeamName {
  constructor(
    public dialogRef: MatDialogRef<EditTeamName>,
    @Inject(MAT_DIALOG_DATA) public data: AddPlayer,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'notification',
  templateUrl: 'notification.html',
  styleUrls: ['../confirm/confirm.component.css']
})
export class Notification {
  title: string;
  message: string;
  constructor(
    public dialogRef: MatDialogRef<Notification>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    
  ) { this.title = data.title;
    this.message = data.message; }
}