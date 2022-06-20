import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../models/player/player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  constructor(private _http: HttpClient) {
  }

  getAllPlayers(): Observable<Player[]> {
    return this._http.get<Player[]>(environment.api_url + "players");
  }
}
