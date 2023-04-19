import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluePopUpComponent } from './blue-pop-up.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';

describe('BluePopUpComponent', () => {
  let component: BluePopUpComponent;
  let fixture: ComponentFixture<BluePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [BluePopUpComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CirrusSanitizerService, useClass: CirrusSanitizerService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BluePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
