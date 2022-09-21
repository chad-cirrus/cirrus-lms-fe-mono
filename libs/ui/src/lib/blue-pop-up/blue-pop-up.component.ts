import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CirrusSanitizerService } from '../shared/cirrus-sanitizer.service';

@Component({
  selector: 'cirrus-bluepopup',
  templateUrl: './blue-pop-up.component.html',
  styleUrls: ['./blue-pop-up.component.scss'],
})
export class BluePopUpComponent implements OnInit {
  private _html!: SafeResourceUrl;

  get html() {
    return this._html;
  }

  constructor(
    private dialogRef: MatDialogRef<any>,
    private cirrusSanitizer: CirrusSanitizerService,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit() {
    this._html = this.cirrusSanitizer.getSafeHtml(this.data.body);
  }

  close(btn: any) {
    this.dialogRef.close({ data: btn });
  }
}
