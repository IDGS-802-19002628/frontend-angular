import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUsuariosEComponent } from './insert-usuarios-e.component';

describe('InsertUsuariosEComponent', () => {
  let component: InsertUsuariosEComponent;
  let fixture: ComponentFixture<InsertUsuariosEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertUsuariosEComponent]
    });
    fixture = TestBed.createComponent(InsertUsuariosEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
