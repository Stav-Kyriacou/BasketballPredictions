import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Team } from 'src/app/models/team/team';

@Injectable({
  providedIn: 'root'
})
export class TeamAllocationService {

  readonly baseUrl: string = "https://teameastbasketball.azurewebsites.net";

  constructor(private _http: HttpClient) { }
  
  getAllocations(teamID: number): Observable<Team[]> {
    return this._http.get<Team[]>(this.baseUrl + "/TeamAllocation/" + teamID)
  }
}
