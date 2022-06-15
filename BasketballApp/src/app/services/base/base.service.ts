import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  readonly baseUrl: string = "https://teameastbasketball.azurewebsites.net";
  // readonly baseUrl: string = "https://teameast-api-staging.azurewebsites.net";
  //  readonly baseUrl: string = "https://localhost:5001";
  constructor() { }
}
