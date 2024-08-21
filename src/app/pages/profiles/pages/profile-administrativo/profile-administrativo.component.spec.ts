import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdministrativoComponent } from './profile-administrativo.component';

describe('ProfileAdministrativoComponent', () => {
  let component: ProfileAdministrativoComponent;
  let fixture: ComponentFixture<ProfileAdministrativoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAdministrativoComponent]
    });
    fixture = TestBed.createComponent(ProfileAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
