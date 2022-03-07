import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSequencerComponent } from './application-sequencer.component';

describe('ApplicationSequencerComponent', () => {
  let component: ApplicationSequencerComponent;
  let fixture: ComponentFixture<ApplicationSequencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationSequencerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSequencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
