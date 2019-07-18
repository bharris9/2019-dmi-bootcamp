import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-score-page',
  templateUrl: './box-score-page.component.html',
  styleUrls: ['./box-score-page.component.scss']
})
export class BoxScorePageComponent {
  @Input()
  boxScore;
}
