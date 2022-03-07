import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmenuCardComponent } from './emenu-card.component';

describe('EmenuCardComponent', () => {
  let component: EmenuCardComponent;
  let fixture: ComponentFixture<EmenuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmenuCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
