import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cirrus-full-screen-image-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-screen-image-dialog.component.html',
  styleUrls: ['./full-screen-image-dialog.component.scss'],
})

export class FullScreenImageDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public imageData: {
      imgUrl: string;
      imgTitle: string;
    },
    public dialogRef: MatDialogRef<FullScreenImageDialogComponent>,
  ) {}

  close() {
    this.dialogRef.close();
  }

}
