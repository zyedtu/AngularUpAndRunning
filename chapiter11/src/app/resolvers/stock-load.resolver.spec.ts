import { TestBed } from '@angular/core/testing';

import { StockLoadResolver } from './stock-load.resolver';

describe('StockLoadResolver', () => {
  let resolver: StockLoadResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StockLoadResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
