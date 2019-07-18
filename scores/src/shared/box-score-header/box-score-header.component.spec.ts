import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxScoreHeaderComponent } from './box-score-header.component';

describe('BoxScoreHeaderComponent', () => {
  let component: BoxScoreHeaderComponent;
  let fixture: ComponentFixture<BoxScoreHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxScoreHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxScoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
