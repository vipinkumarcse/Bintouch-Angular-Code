import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLostnfoundComponent } from './application-lostnfound.component';

describe('ApplicationLostnfoundComponent', () => {
  let component: ApplicationLostnfoundComponent;
  let fixture: ComponentFixture<ApplicationLostnfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationLostnfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLostnfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
