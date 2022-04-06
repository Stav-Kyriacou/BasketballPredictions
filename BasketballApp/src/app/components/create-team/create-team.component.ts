import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html', 
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  value: string = '';
  teams: string[] = [];

  constructor() { }

  ngOnInit() {
    // let storedTeams: string;
    var storedTeams = JSON.parse(localStorage.getItem("teams"));

    if (storedTeams == null) return;
    
    this.teams = storedTeams;
  }

  onSubmit() {
    if (this.value == '') return;
    
    this.teams.push(this.value);
    localStorage.setItem('teams', JSON.stringify(this.teams));
    this.value = '';
  }
}