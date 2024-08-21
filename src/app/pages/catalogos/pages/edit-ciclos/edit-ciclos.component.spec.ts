import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCiclosComponent } from './edit-ciclos.component';

describe('EditCiclosComponent', () => {
  let component: EditCiclosComponent;
  let fixture: ComponentFixture<EditCiclosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCiclosComponent]
    });
    fixture = TestBed.createComponent(EditCiclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
