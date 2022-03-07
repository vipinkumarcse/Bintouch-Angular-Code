import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfcTagComponent } from './nfc-tag.component';

describe('NfcTagComponent', () => {
  let component: NfcTagComponent;
  let fixture: ComponentFixture<NfcTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NfcTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
