import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxScorePageComponent } from './box-score-page.component';

describe('BoxScorePageComponent', () => {
  let component: BoxScorePageComponent;
  let fixture: ComponentFixture<BoxScorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxScorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxScorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
