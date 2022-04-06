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

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.value == '') return;
    
    this.teams.push(this.value);
    this.value = '';
  }
}