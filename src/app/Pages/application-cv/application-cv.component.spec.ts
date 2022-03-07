import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCvComponent } from './application-cv.component';

describe('ApplicationCvComponent', () => {
  let component: ApplicationCvComponent;
  let fixture: ComponentFixture<ApplicationCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
