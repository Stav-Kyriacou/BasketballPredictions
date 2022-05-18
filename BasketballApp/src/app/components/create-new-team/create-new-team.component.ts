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
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  value: string = '';
  teams: Team[] = [];

  constructor(private _formBuilder: FormBuilder, private _teamService: TeamService, private router: Router, public dialog: MatDialog) {}
  onSubmit() {
    // send POST request with value(name of team) to API
    if (this.value != '') {
      this._teamService.postATeam(this.value).subscribe(value => value,
        ()=>{
          this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
        });
    }
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
  }
  // navigate to edit-team page with the team ID as the last /
  editTeam(team: number) {
    this.router.navigate(["edit-team", team]);
  }
}

