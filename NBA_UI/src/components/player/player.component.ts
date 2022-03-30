import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/Player';
import { PlayerService } from '../../services/player.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playerList: Player[];

  constructor(private _playerService: PlayerService) {
   }

  ngOnInit() {
    this._playerService.getAllPlayers().subscribe(unpackedPlayers => this.playerList = unpackedPlayers);
    console.log(this.playerList);
    
  }

}
