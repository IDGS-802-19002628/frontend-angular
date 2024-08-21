import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaDialogComponent } from './cita-dialog.component';

describe('CitaDialogComponent', () => {
  let component: CitaDialogComponent;
  let fixture: ComponentFixture<CitaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitaDialogComponent]
    });
    fixture = TestBed.createComponent(CitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
