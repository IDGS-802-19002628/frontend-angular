import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduccionPendienteComponent } from './list-produccion-pendiente.component';

describe('ListProduccionPendienteComponent', () => {
  let component: ListProduccionPendienteComponent;
  let fixture: ComponentFixture<ListProduccionPendienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProduccionPendienteComponent]
    });
    fixture = TestBed.createComponent(ListProduccionPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
