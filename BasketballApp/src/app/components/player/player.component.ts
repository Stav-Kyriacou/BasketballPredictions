import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player/player';
import { PlayerService } from '../../services/player.service';
import { PlayerTableComponent } from '../player-table/player-table.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;
  playerList: Player[] = [];

  constructor(private _playerService: PlayerService) { }

  ngOnInit(): void {
    this._playerService.getAllPlayers().subscribe(unpackedPlayers => this.playerList = unpackedPlayers,
      error => console.log("Error" + error),
      () => {
        //executed once completed
        this.playerTable.setupTable(this.playerList);
      });
  }
}