import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMaestroComponent } from './profile-maestro.component';

describe('ProfileMaestroComponent', () => {
  let component: ProfileMaestroComponent;
  let fixture: ComponentFixture<ProfileMaestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMaestroComponent]
    });
    fixture = TestBed.createComponent(ProfileMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
