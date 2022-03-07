import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLostFoundComponent } from './app-lost-found.component';

describe('AppLostFoundComponent', () => {
  let component: AppLostFoundComponent;
  let fixture: ComponentFixture<AppLostFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLostFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLostFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
