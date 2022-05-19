import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-compare-teams',
  templateUrl: './compare-teams.component.html',
  styleUrls: ['./compare-teams.component.css']
})
export class CompareTeamsComponent implements OnInit {
  teams: Team[] = [];
  teamAId: number;
  teamBId: number;
  winRate: number = 50;
  constructor(private _teamService: TeamService) { }

  ngOnInit(): void {
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams,
      null,
      () => {
        console.log(this.teams);
      });
  }
  onCompare() {
    this._teamService.compareTeams(this.teamAId, this.teamBId).subscribe(result => this.winRate = result, null, () => {
      console.log(this.winRate);
    });
  }
}