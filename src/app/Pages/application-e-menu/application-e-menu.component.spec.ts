import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEMenuComponent } from './application-e-menu.component';

describe('ApplicationEMenuComponent', () => {
  let component: ApplicationEMenuComponent;
  let fixture: ComponentFixture<ApplicationEMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationEMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationEMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
