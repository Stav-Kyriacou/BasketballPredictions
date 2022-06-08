import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/models/team/team';
import { TeamService } from 'src/app/services/team/team.service';
import { SelectPlayer } from '../edit-team/edit-team.component';
import { PlayerTableComponent } from '../player-table/player-table.component';

@Component({
  selector: 'view-team-players',
  templateUrl: './view-team-players.component.html',
  styleUrls: ['./view-team-players.component.css']
})

export class ViewTeamPlayersComponent implements OnInit {
  teams: Team[] = [];
  constructor(private _teamService: TeamService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectPlayer>,
    @Inject(MAT_DIALOG_DATA) public data: Team
  ) { }

  @ViewChild(PlayerTableComponent) playerTable: PlayerTableComponent;

  ngAfterViewInit() {
    this.playerTable.setupTable(this.data.players);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}


