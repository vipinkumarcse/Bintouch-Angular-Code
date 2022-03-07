import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLinktreeComponent } from './application-linktree.component';

describe('ApplicationLinktreeComponent', () => {
  let component: ApplicationLinktreeComponent;
  let fixture: ComponentFixture<ApplicationLinktreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationLinktreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLinktreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
