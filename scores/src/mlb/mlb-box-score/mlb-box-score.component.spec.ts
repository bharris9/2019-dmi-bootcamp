import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlbBoxScoreComponent } from './mlb-box-score.component';

describe('MlbBoxScoreComponent', () => {
  let component: MlbBoxScoreComponent;
  let fixture: ComponentFixture<MlbBoxScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlbBoxScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlbBoxScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
