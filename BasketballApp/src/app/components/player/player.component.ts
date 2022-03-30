
import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playerList: Player[] = [];

  constructor(private _playerService: PlayerService) {
   }

  ngOnInit(): void {
    this._playerService.getAllPlayers().subscribe(unpackedPlayers => this.playerList = unpackedPlayers);
  }
}