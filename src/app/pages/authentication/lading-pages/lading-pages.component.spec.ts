import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadingPagesComponent } from './lading-pages.component';

describe('LadingPagesComponent', () => {
  let component: LadingPagesComponent;
  let fixture: ComponentFixture<LadingPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LadingPagesComponent]
    });
    fixture = TestBed.createComponent(LadingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
