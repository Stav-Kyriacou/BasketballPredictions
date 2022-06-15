import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../models/player/player';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})

export class PlayerService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }

  getAllPlayers(): Observable<Player[]> {
    return this._http.get<Player[]>(this.baseUrl + "/players");
  }
}
