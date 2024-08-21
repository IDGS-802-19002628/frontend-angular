import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCiclosComponent } from './list-ciclos.component';

describe('ListCiclosComponent', () => {
  let component: ListCiclosComponent;
  let fixture: ComponentFixture<ListCiclosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCiclosComponent]
    });
    fixture = TestBed.createComponent(ListCiclosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
