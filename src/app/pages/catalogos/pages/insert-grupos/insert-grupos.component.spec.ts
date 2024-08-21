import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertGruposComponent } from './insert-grupos.component';

describe('InsertGruposComponent', () => {
  let component: InsertGruposComponent;
  let fixture: ComponentFixture<InsertGruposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertGruposComponent]
    });
    fixture = TestBed.createComponent(InsertGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
