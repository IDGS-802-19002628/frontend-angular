import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduccionTerminadoComponent } from './list-produccion-terminado.component';

describe('ListProduccionTerminadoComponent', () => {
  let component: ListProduccionTerminadoComponent;
  let fixture: ComponentFixture<ListProduccionTerminadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProduccionTerminadoComponent]
    });
    fixture = TestBed.createComponent(ListProduccionTerminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
