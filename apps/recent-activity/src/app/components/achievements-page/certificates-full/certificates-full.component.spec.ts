import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesFullComponent } from './certificates-full.component';

describe('CertificatesFullComponent', () => {
  let component: CertificatesFullComponent;
  let fixture: ComponentFixture<CertificatesFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificatesFullComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
