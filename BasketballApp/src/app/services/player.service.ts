import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player/player';
import { Team } from '../models/team/team';


@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  readonly baseUrl: string = "https://teameastbasketball.azurewebsites.net";
  readonly headers = new HttpHeaders({'Content-Type': 'application/json'});
  readonly options = { headers: this.headers };
  // readonly baseUrl: string = "https://localhost:5001";
  

  constructor(private _http: HttpClient) {
  }

  getAllPlayers(): Observable<Player[]> {
    return this._http.get<Player[]>(this.baseUrl+"/players");
  }

  GetAllTeams(): Observable<Team[]>{
    return this._http.get<Team[]>(this.baseUrl+"/teams")
  }

  PostATeam(team:string ): Observable<string>{
    return this._http.post<string>(this.baseUrl+"/team", team, this.options)
  }

}