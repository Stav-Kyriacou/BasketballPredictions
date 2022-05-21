import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';
import { PlayerService } from '../../services/player.service'
import { ConfirmComponent, ConfirmDialogModel } from '../confirm/confirm.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  value: string = '';
  teams: Team[] = [];


  constructor(private _teamService: TeamService, private router: Router, public dialog: MatDialog) { }

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

  // navigate to edit-team page with the team ID as the last /
  editTeam(team: number) {
    this.router.navigate(["edit-team", team]);
  }
  //deletes a team by their ID from API
  deleteTeam(TeamID: number) {
    this._teamService.deleteTeam(TeamID).subscribe(data => data,
      () => {
        this._teamService.getAllTeams().subscribe(unpackedTeams => this.teams = unpackedTeams);
      });
  }
  confirmDialog(TeamID: number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Deleting Team", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult ==true) {
        this.deleteTeam(TeamID)
      }
    });
  }
}
