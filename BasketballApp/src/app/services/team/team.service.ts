import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Team } from 'src/app/models/team/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly baseUrl: string = "https://teameastbasketball.azurewebsites.net";
  // readonly baseUrl: string = "https://localhost:5001";


  constructor(private _http: HttpClient) { }


  getAllTeams(): Observable<Team[]> {
    return this._http.get<Team[]>(this.baseUrl + "/teams")
  }

  postATeam(team: string): Observable<string> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(team);
    return this._http.post<string>(this.baseUrl + "/team", body, { 'headers': headers })
  }
  getATeam(teamID: number): Observable<Team> {
    return this._http.get<Team>(this.baseUrl + '/team/' + teamID)
  }

  addPlayerToTeam(teamID: number, playerID: number, year: number): Observable<string> {
    const params = new HttpParams()
      .append('TeamID', teamID)
      .append('PlayerID', playerID)
      .append('Year', year)
    const body = ''
    return this._http.post<string>(this.baseUrl + '/teamAllocation', body, { 'params': params })
  }
  deleteTeam(teamID: number): Observable<string> {
    const params = new HttpParams()
      .append('teamId', teamID)
    return this._http.delete<string>(this.baseUrl + "/team/", { 'params': params })
  }

  saveATeam(team: Team): Observable<string> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(team);
    return this._http.put<string>(this.baseUrl + '/teamAllocation', body, { 'headers': headers })
  }
  compareTeams(teamAId: number, teamBId: number): Observable<number> {
    // const headers = { 'content-type': 'application/json' };
    // const body = JSON.stringify(teams);
    const params = new HttpParams()
      .append('teamAId', teamAId)
      .append('teamBId', teamBId);
    return this._http.get<number>(this.baseUrl + '/compare', { 'params': params });
  }
}
