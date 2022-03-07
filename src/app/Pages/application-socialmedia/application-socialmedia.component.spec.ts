import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSocialmediaComponent } from './application-socialmedia.component';

describe('ApplicationSocialmediaComponent', () => {
  let component: ApplicationSocialmediaComponent;
  let fixture: ComponentFixture<ApplicationSocialmediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationSocialmediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSocialmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
