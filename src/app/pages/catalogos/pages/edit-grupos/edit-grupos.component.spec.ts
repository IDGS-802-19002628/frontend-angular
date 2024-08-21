import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGruposComponent } from './edit-grupos.component';

describe('EditGruposComponent', () => {
  let component: EditGruposComponent;
  let fixture: ComponentFixture<EditGruposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGruposComponent]
    });
    fixture = TestBed.createComponent(EditGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
