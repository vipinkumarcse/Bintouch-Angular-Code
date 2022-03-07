import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWhatsappComponent } from './application-whatsapp.component';

describe('ApplicationWhatsappComponent', () => {
  let component: ApplicationWhatsappComponent;
  let fixture: ComponentFixture<ApplicationWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationWhatsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
