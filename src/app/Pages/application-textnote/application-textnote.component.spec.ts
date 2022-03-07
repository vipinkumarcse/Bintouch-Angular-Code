import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTextnoteComponent } from './application-textnote.component';

describe('ApplicationTextnoteComponent', () => {
  let component: ApplicationTextnoteComponent;
  let fixture: ComponentFixture<ApplicationTextnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationTextnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTextnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
