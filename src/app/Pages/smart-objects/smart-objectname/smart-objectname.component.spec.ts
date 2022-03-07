import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartObjectnameComponent } from './smart-objectname.component';

describe('SmartObjectnameComponent', () => {
  let component: SmartObjectnameComponent;
  let fixture: ComponentFixture<SmartObjectnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartObjectnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartObjectnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
