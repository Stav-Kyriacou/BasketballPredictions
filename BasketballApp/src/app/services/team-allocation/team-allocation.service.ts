import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Team } from 'src/app/models/team/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamAllocationService {

  constructor(private _http: HttpClient) {
  }

  getAllocations(teamID: number): Observable<Team[]> {
    return this._http.get<Team[]>(environment.api_url + "TeamAllocation/" + teamID)
  }
}