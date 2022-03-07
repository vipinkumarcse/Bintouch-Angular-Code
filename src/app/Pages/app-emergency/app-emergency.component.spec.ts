import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEmergencyComponent } from './app-emergency.component';

describe('AppEmergencyComponent', () => {
  let component: AppEmergencyComponent;
  let fixture: ComponentFixture<AppEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppEmergencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
