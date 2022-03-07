import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Linktree2Component } from './linktree2.component';

describe('Linktree2Component', () => {
  let component: Linktree2Component;
  let fixture: ComponentFixture<Linktree2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Linktree2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Linktree2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
