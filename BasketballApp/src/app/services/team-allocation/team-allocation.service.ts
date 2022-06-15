import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Team } from 'src/app/models/team/team';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TeamAllocationService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }

  getAllocations(teamID: number): Observable<Team[]> {
    return this._http.get<Team[]>(this.baseUrl + "/TeamAllocation/" + teamID)
  }
}