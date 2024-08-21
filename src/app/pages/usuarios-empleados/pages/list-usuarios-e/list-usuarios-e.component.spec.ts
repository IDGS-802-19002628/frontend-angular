import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuariosEComponent } from './list-usuarios-e.component';

describe('ListUsuariosEComponent', () => {
  let component: ListUsuariosEComponent;
  let fixture: ComponentFixture<ListUsuariosEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsuariosEComponent]
    });
    fixture = TestBed.createComponent(ListUsuariosEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
