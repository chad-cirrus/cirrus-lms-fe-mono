import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cirrus-test-alpha',
  templateUrl: './test-alpha.component.html',
  styleUrls: ['./test-alpha.component.scss'],
})
export class TestAlphaComponent implements OnInit {

  @Input() message = 'No Message Given'

  ngOnInit(): void {
    console.log('test alpah!');
  }
}
