import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
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


  constructor(private _formBuilder: FormBuilder, private _teamService: TeamService, private router: Router, public dialog: MatDialog, public auth: AuthService) { }
  onSubmit() {
    let userId: string;
    this.auth.getUser().subscribe(data => userId = data.sub, null, () => {
      if (userId == null) return;
      // send POST request with value(name of team) to API
      if (this.value != '') {
        this._teamService.postATeam(this.value, userId).subscribe(value => this.teamid = value, null,
          () => {
            this.router.navigate(["edit-team", this.teamid]);
          });
      }
    });
  }

  ngOnInit() {
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
  }
}