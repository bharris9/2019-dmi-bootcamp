import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Score } from './score-item.model';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {
  @Input()
  scoreItem: Score;

  @Output()
  buttonClicked: EventEmitter<void> = new EventEmitter();

  @Input()
  showButton = true;

  @Input()
  buttonText: string;

  constructor() {}

  ngOnInit() {}

  get isScheduled() {
    return this.scoreItem.statusType === 'STATUS_SCHEDULED';
  }

  get isInProgress() {
    return this.scoreItem.statusType === 'STATUS_IN_PROGRESS';
  }

  get isFinal() {
    return this.scoreItem.statusType === 'STATUS_FINAL';
  }
}
