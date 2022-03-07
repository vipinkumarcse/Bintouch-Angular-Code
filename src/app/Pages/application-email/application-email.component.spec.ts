import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEmailComponent } from './application-email.component';

describe('ApplicationEmailComponent', () => {
  let component: ApplicationEmailComponent;
  let fixture: ComponentFixture<ApplicationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
