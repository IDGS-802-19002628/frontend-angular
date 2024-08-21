import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBibliotecaAndradeComponent } from './list-biblioteca-andrade.component';

describe('ListBibliotecaAndradeComponent', () => {
  let component: ListBibliotecaAndradeComponent;
  let fixture: ComponentFixture<ListBibliotecaAndradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBibliotecaAndradeComponent]
    });
    fixture = TestBed.createComponent(ListBibliotecaAndradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
