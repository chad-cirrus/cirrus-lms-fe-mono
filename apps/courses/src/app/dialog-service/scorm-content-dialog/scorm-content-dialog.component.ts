import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlayListItem } from '@cirrus/models';

@Component({
  selector: 'cirrus-scorm-content-dialog',
  templateUrl: './scorm-content-dialog.component.html',
  styleUrls: ['./scorm-content-dialog.component.scss'],
})
export class ScormContentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IPlayListItem) {}
}
