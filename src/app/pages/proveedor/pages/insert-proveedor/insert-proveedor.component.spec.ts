import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProveedorComponent } from './insert-proveedor.component';

describe('InsertProveedorComponent', () => {
  let component: InsertProveedorComponent;
  let fixture: ComponentFixture<InsertProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertProveedorComponent]
    });
    fixture = TestBed.createComponent(InsertProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
