import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoServicioComponent } from './producto-servicio.component';

describe('ProductoServicioComponent', () => {
  let component: ProductoServicioComponent;
  let fixture: ComponentFixture<ProductoServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoServicioComponent]
    });
    fixture = TestBed.createComponent(ProductoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
