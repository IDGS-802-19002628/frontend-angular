import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProductoComponent } from './insert-producto.component';

describe('InsertProductoComponent', () => {
  let component: InsertProductoComponent;
  let fixture: ComponentFixture<InsertProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertProductoComponent]
    });
    fixture = TestBed.createComponent(InsertProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
