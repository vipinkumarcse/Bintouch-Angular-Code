import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlugProfileComponent } from './slug-profile.component';

describe('SlugProfileComponent', () => {
  let component: SlugProfileComponent;
  let fixture: ComponentFixture<SlugProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlugProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlugProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
