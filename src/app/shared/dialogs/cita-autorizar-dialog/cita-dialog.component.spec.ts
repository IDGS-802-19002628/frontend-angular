import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaDialogComponentAutorizar } from './cita-dialog.component';

describe('CitaDialogComponent', () => {
  let component: CitaDialogComponentAutorizar;
  let fixture: ComponentFixture<CitaDialogComponentAutorizar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitaDialogComponentAutorizar]
    });
    fixture = TestBed.createComponent(CitaDialogComponentAutorizar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
