import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cirrus-global-footer',
  templateUrl: './global-footer.component.html',
  styleUrls: ['./global-footer.component.scss'],
})
export class GlobalFooterComponent implements OnInit {
  
  copyrightYear = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
