import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuariosEComponent } from './edit-usuarios-e.component';

describe('EditUsuariosEComponent', () => {
  let component: EditUsuariosEComponent;
  let fixture: ComponentFixture<EditUsuariosEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUsuariosEComponent]
    });
    fixture = TestBed.createComponent(EditUsuariosEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
