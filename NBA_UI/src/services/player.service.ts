import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/Player';


@Injectable({
  providedIn: 'root'
})

export class PlayerService {
  readonly baseUrl: string = "https://teameastbasketball.azurewebsites.net/players";

  constructor(private _http: HttpClient) { }
  
  getAllPlayers(): Observable<Player[]> {
    return this._http.get<Player[]>(this.baseUrl);
  }

}

