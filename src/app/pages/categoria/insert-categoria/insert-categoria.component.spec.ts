import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCategoriaComponent } from './insert-categoria.component';

describe('InsertCategoriaComponent', () => {
  let component: InsertCategoriaComponent;
  let fixture: ComponentFixture<InsertCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertCategoriaComponent]
    });
    fixture = TestBed.createComponent(InsertCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
