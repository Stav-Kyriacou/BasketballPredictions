import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    // let storedTeams: string;
    this._teamService.GetAllTeams().subscribe(unpackedPlayers => this.teams = unpackedPlayers);
  }

  onSubmit() {
    // send POST request with value(name of team) to API
    this._teamService.PostATeam(this.value).subscribe(value => value,
    ()=>{
      // Reload list of teams
      this._teamService.GetAllTeams().subscribe(unpackedPlayers => this.teams = unpackedPlayers);
    });
  }
}
