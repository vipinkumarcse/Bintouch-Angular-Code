import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationContactcardComponent } from './application-contactcard.component';

describe('ApplicationContactcardComponent', () => {
  let component: ApplicationContactcardComponent;
  let fixture: ComponentFixture<ApplicationContactcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationContactcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationContactcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
