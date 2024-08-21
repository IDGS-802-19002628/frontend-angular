import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEscuelasComponent } from './list-escuelas.component';

describe('ListEscuelasComponent', () => {
  let component: ListEscuelasComponent;
  let fixture: ComponentFixture<ListEscuelasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEscuelasComponent]
    });
    fixture = TestBed.createComponent(ListEscuelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
