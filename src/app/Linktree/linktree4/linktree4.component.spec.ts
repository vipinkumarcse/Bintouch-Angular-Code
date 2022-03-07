import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Linktree4Component } from './linktree4.component';

describe('Linktree4Component', () => {
  let component: Linktree4Component;
  let fixture: ComponentFixture<Linktree4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Linktree4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Linktree4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
