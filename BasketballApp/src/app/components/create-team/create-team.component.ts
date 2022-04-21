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
  test:Team = {teamName:'my team', teamID:79,dateMade:new Date()}
  teams: Team[] = [];

  constructor(private _teamService: PlayerService) { }

  ngOnInit() {
    // let storedTeams: string;
    this._teamService.GetAllTeams().subscribe(unpackedPlayers => this.teams = unpackedPlayers);
  }

  onSubmit() {
    this._teamService.PostATeam(this.value).subscribe(value => value,
    ()=>{
      this._teamService.GetAllTeams().subscribe(unpackedPlayers => this.teams = unpackedPlayers);
    });
  }
}