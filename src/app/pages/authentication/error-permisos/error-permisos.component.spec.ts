import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPermisosComponent } from './error-permisos.component';

describe('ErrorPermisosComponent', () => {
  let component: ErrorPermisosComponent;
  let fixture: ComponentFixture<ErrorPermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPermisosComponent]
    });
    fixture = TestBed.createComponent(ErrorPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
