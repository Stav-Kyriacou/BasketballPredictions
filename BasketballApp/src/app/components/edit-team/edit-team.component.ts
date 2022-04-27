import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  team: Team;
  teamID:number;
  columnsToDisplay: string[] = ['add','image','name', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoals', 'freeThrows', 'efficiency'];
  teamcolumnsToDisplay: string[] = ['image','name', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoals', 'freeThrows', 'efficiency','remove'];
  tableLoaded: boolean = false;
  currentPlayertableLoaded: boolean = false;
  playerList: Player[] = [];
  dataSource!: MatTableDataSource<Player>;
  currentPlayers!: MatTableDataSource<Player>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, private _playerService: PlayerService) { 

  }

  ngOnInit() {
    // get team ID from URL
    this.route.paramMap.subscribe(params => {this.teamID = Number(params.get("teamID"))})

    // Get team data from API using teamID
    this._playerService.getATeam(this.teamID).subscribe(unpackedTeams => this.team = unpackedTeams,
      error => console.log("Error" + error),
      () => {
        //executed once completed
        this.currentPlayers = new MatTableDataSource<Player>(this.team.players);
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
        this.dataSource.sort = this.sort;
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

  addToTeam(playerID:number){

  }

  removeFromTeam(playerID:number){

  }

  saveTeam(){

  }

}
