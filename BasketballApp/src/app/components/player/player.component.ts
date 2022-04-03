
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/models/player';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  columnsToDisplay: string[] = ['name', 'team', 'points', 'rebounds', 'blocks', 'steals', 'assists', 'fieldGoals', 'freeThrows', 'efficiency'];
  playerList: Player[] = [];
  dataSource!: MatTableDataSource<Player>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _playerService: PlayerService) {
  }

  ngOnInit(): void {
    this._playerService.getAllPlayers().subscribe(unpackedPlayers => this.playerList = unpackedPlayers,
      error => console.log("Error" + error),
      () => {
        //executed once completed
        this.dataSource = new MatTableDataSource<Player>(this.playerList);
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
  }
}