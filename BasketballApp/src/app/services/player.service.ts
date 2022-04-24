import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player/player';
import { Team } from '../models/team/team';



@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  // readonly baseUrl: string = "https://teameastbasketball.azurewebsites.net";
  readonly baseUrl: string = "https://localhost:5001"
  

  constructor(private _http: HttpClient) {
  }

  getAllPlayers(): Observable<Player[]> {
    return this._http.get<Player[]>(this.baseUrl+"/players");
  }

  getAllTeams(): Observable<Team[]>{
    return this._http.get<Team[]>(this.baseUrl+"/teams")
  }

  postATeam(team:string ): Observable<string>{
    const headers= {'content-type':'application/json'}
    const body = JSON.stringify(team);
    return this._http.post<string>(this.baseUrl+"/team", body, {'headers':headers})
  }

  getAllocations(teamID:number ): Observable<Team[]>{
    return this._http.get<Team[]>(this.baseUrl+"/TeamAllocation/"+teamID)
  }

}