import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCalenderComponent } from './application-calender.component';

describe('ApplicationCalenderComponent', () => {
  let component: ApplicationCalenderComponent;
  let fixture: ComponentFixture<ApplicationCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
