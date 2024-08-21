import { TestBed } from '@angular/core/testing';

import { ProductionV2Service } from './produccion-v2.service';

describe('ProduccionV2Service', () => {
  let service: ProductionV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
