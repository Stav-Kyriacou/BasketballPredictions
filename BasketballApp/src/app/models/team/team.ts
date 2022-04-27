import { Player } from "../player/player";

export interface Team {
    teamID: number;
    teamName:string;
    dateMade:Date;
    year:number;
    players:Player[];
  }