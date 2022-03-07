import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartObjectsComponent } from './smart-objects.component';

describe('SmartObjectsComponent', () => {
  let component: SmartObjectsComponent;
  let fixture: ComponentFixture<SmartObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
