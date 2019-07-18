import { TestBed } from '@angular/core/testing';

import { MlbService } from './mlb.service';

describe('MlbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MlbService = TestBed.get(MlbService);
    expect(service).toBeTruthy();
  });
});
