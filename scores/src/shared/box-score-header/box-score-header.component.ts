import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-score-header',
  templateUrl: './box-score-header.component.html',
  styleUrls: ['./box-score-header.component.scss']
})
export class BoxScoreHeaderComponent {
  @Input()
  boxScore: any;

  get homeScore() {
    return this.boxScore.homeScore;
  }

  get awayScore() {
    return this.boxScore.awayScore;
  }
}
