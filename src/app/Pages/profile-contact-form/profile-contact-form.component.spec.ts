import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContactFormComponent } from './profile-contact-form.component';

describe('ProfileContactFormComponent', () => {
  let component: ProfileContactFormComponent;
  let fixture: ComponentFixture<ProfileContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
