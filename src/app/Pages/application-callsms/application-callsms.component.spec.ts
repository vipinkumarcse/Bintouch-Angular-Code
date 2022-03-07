import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCallsmsComponent } from './application-callsms.component';

describe('ApplicationCallsmsComponent', () => {
  let component: ApplicationCallsmsComponent;
  let fixture: ComponentFixture<ApplicationCallsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCallsmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCallsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
