import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrAppServiceComponent } from './qr-app-service.component';

describe('QrAppServiceComponent', () => {
  let component: QrAppServiceComponent;
  let fixture: ComponentFixture<QrAppServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrAppServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrAppServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
