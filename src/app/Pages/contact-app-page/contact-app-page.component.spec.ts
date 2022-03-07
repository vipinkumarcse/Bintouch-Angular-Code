import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAppPageComponent } from './contact-app-page.component';

describe('ContactAppPageComponent', () => {
  let component: ContactAppPageComponent;
  let fixture: ComponentFixture<ContactAppPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactAppPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
