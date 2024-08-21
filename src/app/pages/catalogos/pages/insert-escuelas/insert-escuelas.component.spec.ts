import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEscuelasComponent } from './insert-escuelas.component';

describe('InsertEscuelasComponent', () => {
  let component: InsertEscuelasComponent;
  let fixture: ComponentFixture<InsertEscuelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertEscuelasComponent]
    });
    fixture = TestBed.createComponent(InsertEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
