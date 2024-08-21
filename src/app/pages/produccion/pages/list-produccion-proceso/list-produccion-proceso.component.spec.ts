import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduccionProcesoComponent } from './list-produccion-proceso.component';

describe('ListProduccionProcesoComponent', () => {
  let component: ListProduccionProcesoComponent;
  let fixture: ComponentFixture<ListProduccionProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProduccionProcesoComponent]
    });
    fixture = TestBed.createComponent(ListProduccionProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
