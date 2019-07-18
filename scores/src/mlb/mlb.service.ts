import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MlbBoxScore, MlbScore } from "./mlb-score.model";

@Injectable({
  providedIn: "root"
})
export class MlbService {
  constructor(private http: HttpClient) {}

  getMlbScores(): Observable<MlbScore[]> {
    return this.http.get<MlbScore[]>("http://localhost:3000/scores/mlb/");
  }

  getMlbBoxScore(id: string): Observable<MlbBoxScore> {
    return this.http.get<MlbBoxScore>(`http://localhost:3000/scores/mlb/${id}`);
  }
}
