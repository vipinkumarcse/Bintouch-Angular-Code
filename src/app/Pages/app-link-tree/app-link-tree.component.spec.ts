import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLinkTreeComponent } from './app-link-tree.component';

describe('AppLinkTreeComponent', () => {
  let component: AppLinkTreeComponent;
  let fixture: ComponentFixture<AppLinkTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLinkTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLinkTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
