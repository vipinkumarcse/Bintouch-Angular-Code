import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Linktree3Component } from './linktree3.component';

describe('Linktree3Component', () => {
  let component: Linktree3Component;
  let fixture: ComponentFixture<Linktree3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Linktree3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Linktree3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
