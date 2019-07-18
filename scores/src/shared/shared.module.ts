import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCardComponent } from './score-card/score-card.component';
import { RouterModule } from '@angular/router';
import { BoxScoreHeaderComponent } from './box-score-header/box-score-header.component';
import { BoxScorePageComponent } from './box-score-page/box-score-page.component';

@NgModule({
  declarations: [ScoreCardComponent, BoxScoreHeaderComponent, BoxScorePageComponent],
  exports: [ScoreCardComponent, BoxScoreHeaderComponent, BoxScorePageComponent],
  imports: [CommonModule, RouterModule]
})
export class SharedModule {}
