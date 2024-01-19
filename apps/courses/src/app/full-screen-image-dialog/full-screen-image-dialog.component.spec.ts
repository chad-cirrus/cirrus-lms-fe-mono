import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenImageDialogComponent } from './full-screen-image-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('FullScreenImageDialogComponent', () => {
  let component: FullScreenImageDialogComponent;
  let fixture: ComponentFixture<FullScreenImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullScreenImageDialogComponent,
        MatDialogModule,],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FullScreenImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
