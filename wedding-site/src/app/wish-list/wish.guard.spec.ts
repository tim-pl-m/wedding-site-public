import { TestBed, async, inject } from '@angular/core/testing';

import { WishGuard } from './wish.guard';

describe('WishGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishGuard]
    });
  });

  it('should ...', inject([WishGuard], (guard: WishGuard) => {
    expect(guard).toBeTruthy();
  }));
});
