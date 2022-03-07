import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationlinkingComponent } from './applicationlinking.component';

describe('ApplicationlinkingComponent', () => {
  let component: ApplicationlinkingComponent;
  let fixture: ComponentFixture<ApplicationlinkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationlinkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationlinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
