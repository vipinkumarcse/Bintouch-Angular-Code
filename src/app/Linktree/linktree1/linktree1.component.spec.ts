import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Linktree1Component } from './linktree1.component';

describe('Linktree1Component', () => {
  let component: Linktree1Component;
  let fixture: ComponentFixture<Linktree1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Linktree1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Linktree1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
