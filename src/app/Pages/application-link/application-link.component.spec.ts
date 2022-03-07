import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLinkComponent } from './application-link.component';

describe('ApplicationLinkComponent', () => {
  let component: ApplicationLinkComponent;
  let fixture: ComponentFixture<ApplicationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
