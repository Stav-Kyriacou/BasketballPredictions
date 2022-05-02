import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import { PlayerService } from 'src/app/services/player.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AddPlayer{
  dataSource: MatTableDataSource<Player>;
  columnsToDisplay: string[];
  playerList: Player[];
  team: Team;
  currentPlayers: MatTableDataSource<Player>;
  sortAllPlayers: MatSort;
}

let team: Team;

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  teamID:number;
  columnsToDisplay: string[] = ['add','image','playerName', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoalsMade', 'freeThrowsMade', 'efficiency'];
  teamcolumnsToDisplay: string[] = ['image','playerName', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoalsMade', 'freeThrowsMade', 'efficiency','remove'];
  tableLoaded: boolean = false;
  currentPlayertableLoaded: boolean = false;
  playerList: Player[] = [];
  dataSource!: MatTableDataSource<Player>;
  currentPlayers!: MatTableDataSource<Player>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sortAllPlayers: MatSort;

  constructor( private router: Router,private route: ActivatedRoute, private _playerService: PlayerService, public dialog: MatDialog) {

  }

  ngOnInit() {
    // get team ID from URL
    this.route.paramMap.subscribe(params => {this.teamID = Number(params.get("teamID"))})

    // Get team data from API using teamID
    this._playerService.getATeam(this.teamID).subscribe(unpackedTeams => team = unpackedTeams,
      error => console.log("Error" + error),
      () => {
        //executed once completed
        this.currentPlayers = new MatTableDataSource<Player>(team.players);
        this.currentPlayers.sort = this.sort;
        this.currentPlayertableLoaded = true;
      });


    // Get all players
    this._playerService.getAllPlayers().subscribe(unpackedPlayers => this.playerList = unpackedPlayers,
      error => console.log("Error" + error),
      () => {
        //executed once completed
        this.dataSource = new MatTableDataSource<Player>(this.playerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortAllPlayers;
        this.tableLoaded = true;
      });
  }

  // apply filter to all players table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // apply filter to users team
  teamapplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPlayers.filter = filterValue.trim().toLowerCase();

    if (this.currentPlayers.paginator) {
      this.currentPlayers.paginator.firstPage();
    }
  }

  removeFromTeam(playerindex:number){
    team.players.splice(playerindex,1);
    this.currentPlayers = new MatTableDataSource<Player>(team.players);
  }

  saveTeam(){
    this._playerService.saveATeam(team).subscribe(value => value,
      ()=>{
        this.router.navigate(["create-team"]);
      });
  }

  addplayers(): void{
    const dialogRef = this.dialog.open(SelectPlayer, {
      width: '60vw',
      height:'600px',
      data: {dataSource:this.dataSource, columnsToDisplay:this.columnsToDisplay, playerList:this.playerList, currentPlayers:this.currentPlayers},
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentPlayers = new MatTableDataSource<Player>(team.players);
    });

  }

}

@Component({
  selector: 'select-player',
  templateUrl: 'select-player.html',
  styleUrls: ['./select-player.css']
})
export class SelectPlayer {
  tempPlayers:Player[];

  constructor(
    public dialogRef: MatDialogRef<SelectPlayer>,
    @Inject(MAT_DIALOG_DATA) public data: AddPlayer,
    private _snackBar:MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.data.dataSource.paginator) {
      this.data.dataSource.paginator.firstPage();
    }
  }

  addToTeam(player:Player){
    if (team.players == null) {
      team.players = [];
      team.players.push(player)
    }else{
    team.players.push(player)
    }
    this._snackBar.open(player.playerName + " has been added to the team ",'okay', {
      duration:3000
    })
  }

  close(){
    this.dialogRef.close();
  }

}
