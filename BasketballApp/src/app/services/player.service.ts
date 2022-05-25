import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player/player';
import { Team } from '../models/team/team';
import { TeamAllocation } from '../models/teamAllocation/teamAllocation';
import { TemplateBindingIdentifier } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  readonly baseUrl: string = "https://teameastbasketball.azurewebsites.net";
  //  readonly baseUrl: string = "https://localhost:5001";

  constructor(private _http: HttpClient) {
  }

  getAllPlayers(): Observable<Player[]> {
    return this._http.get<Player[]>(this.baseUrl + "/players");
  }
}
