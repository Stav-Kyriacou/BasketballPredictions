import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';
import { PlayerService } from '../../services/player.service'

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  value: string = '';
  teams: Team[] = [];


  constructor(private _playerService: PlayerService, private router: Router) { }

  ngOnInit() {
    // Get all Teams data
    this._playerService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);

  }

  onSubmit() {
    // send POST request with value(name of team) to API
    if (this.value != '') {
      this._playerService.postATeam(this.value).subscribe(value => value,
        ()=>{
          // Reload list of teams
          this._playerService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
        });
    }
  }

  // navigate to edit-team page with the team ID as the last /
  editTeam(team: number) {
    this.router.navigate(["edit-team", team]);
  }
  //deletes a team by their ID from API
  deleteTeam(TeamID: number) {
    this._playerService.deleteTeam(TeamID).subscribe(data => data,
      () => {
        this._playerService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
      });
  }
}
