import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPaawordComponent } from './reset-paaword.component';

describe('ResetPaawordComponent', () => {
  let component: ResetPaawordComponent;
  let fixture: ComponentFixture<ResetPaawordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPaawordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPaawordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
