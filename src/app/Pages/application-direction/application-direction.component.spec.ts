import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDirectionComponent } from './application-direction.component';

describe('ApplicationDirectionComponent', () => {
  let component: ApplicationDirectionComponent;
  let fixture: ComponentFixture<ApplicationDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
