import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MlbService } from '../mlb.service';
import { LineScore, MlbBoxScore } from '../mlb-score.model';

@Component({
  selector: 'app-mlb-box-score',
  templateUrl: './mlb-box-score.component.html',
  styleUrls: ['./mlb-box-score.component.scss']
})
export class MlbBoxScoreComponent implements OnInit {
  id: string;
  boxScore: MlbBoxScore;
  homeLine: string[];
  awayLine: string[];

  constructor(private route: ActivatedRoute, private mlbService: MlbService) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];

      this.mlbService.getMlbBoxScore(this.id).subscribe(res => {
        this.boxScore = res;
        this.homeLine = this.getLineScore(this.boxScore.homeScore.lineScores || []);
        this.awayLine = this.getLineScore(this.boxScore.awayScore.lineScores || []);
      });
    });
  }

  private getLineScore(lineScores: LineScore[]): string[] {
    const numberOfInnings = lineScores.length > 9 ? lineScores.length : 9;
    return Array.from({ length: numberOfInnings }).map((u, i) =>
      lineScores[i] ? lineScores[i].displayValue.toString() : ''
    );
  }

  get homeScore() {
    return this.boxScore.homeScore;
  }

  get awayScore() {
    return this.boxScore.awayScore;
  }
}
