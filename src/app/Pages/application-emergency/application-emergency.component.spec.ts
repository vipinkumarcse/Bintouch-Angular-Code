import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEmergencyComponent } from './application-emergency.component';

describe('ApplicationEmergencyComponent', () => {
  let component: ApplicationEmergencyComponent;
  let fixture: ComponentFixture<ApplicationEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationEmergencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
