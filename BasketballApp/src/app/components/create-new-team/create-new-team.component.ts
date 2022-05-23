import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-create-new-team',
  templateUrl: './create-new-team.component.html',
  styleUrls: ['./create-new-team.component.css'],
})
export class CreateNewTeamComponent implements OnInit {

  value: string = '';
  teams: Team[] = [];
  teamid: number;

  constructor(private _formBuilder: FormBuilder, private _teamService: TeamService, private router: Router, public dialog: MatDialog) {}
  onSubmit() {
    // send POST request with value(name of team) to API
    if (this.value != '') {
      this._teamService.postATeam(this.value).subscribe(value => this.teamid,
        ()=>{
          console.log(this.teamid)
            this.router.navigate(["edit-team", this.value]);
        });
    }
  }
  ngOnInit() {
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
  }

}

