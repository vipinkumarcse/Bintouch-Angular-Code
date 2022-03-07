import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWifiComponent } from './application-wifi.component';

describe('ApplicationWifiComponent', () => {
  let component: ApplicationWifiComponent;
  let fixture: ComponentFixture<ApplicationWifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationWifiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
