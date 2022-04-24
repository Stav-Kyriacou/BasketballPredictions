import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player/player';
import { Team } from 'src/app/models/team/team';
import {PlayerService} from '../../services/player.service'

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html', 
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  value: string = '';
  teams: Team[] = [];


  constructor(private _teamService: PlayerService) { }

  ngOnInit() {
    // Get all Teams data
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
  }

  onSubmit() {
    // send POST request with value(name of team) to API
    if (this.value != '') {
      this._teamService.postATeam(this.value).subscribe(value => value,
        ()=>{
          // Reload list of teams
          this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
        });
    }
  }
}
