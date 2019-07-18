import { Component, Input } from '@angular/core';
import { MlbScore } from '../mlb-score.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mlb-score-card',
  templateUrl: './mlb-score-card.component.html',
  styleUrls: ['./mlb-score-card.component.scss']
})
export class MlbScoreCardComponent {
  @Input()
  scoreItem: MlbScore;

  constructor(private router: Router) {}

  handleBoxClick(id) {
    this.router.navigateByUrl('/mlb/' + id);
  }
}
