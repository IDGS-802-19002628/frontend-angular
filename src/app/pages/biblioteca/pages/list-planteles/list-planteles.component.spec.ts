import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlantelesComponent } from './list-planteles.component';

describe('ListPlantelesComponent', () => {
  let component: ListPlantelesComponent;
  let fixture: ComponentFixture<ListPlantelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPlantelesComponent]
    });
    fixture = TestBed.createComponent(ListPlantelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
