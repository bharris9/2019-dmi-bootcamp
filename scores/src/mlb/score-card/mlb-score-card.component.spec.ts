import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlbScoreCardComponent } from './mlb-score-card.component';

describe('ScoreCardComponent', () => {
  let component: MlbScoreCardComponent;
  let fixture: ComponentFixture<MlbScoreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlbScoreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlbScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
