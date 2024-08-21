import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCiclosComponent } from './insert-ciclos.component';

describe('InsertCiclosComponent', () => {
  let component: InsertCiclosComponent;
  let fixture: ComponentFixture<InsertCiclosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertCiclosComponent]
    });
    fixture = TestBed.createComponent(InsertCiclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
