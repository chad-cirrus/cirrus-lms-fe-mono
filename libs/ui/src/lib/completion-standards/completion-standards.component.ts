import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cirrus-completion-standards',
  templateUrl: './completion-standards.component.html',
  styleUrls: ['./completion-standards.component.scss']
})
export class CompletionStandardsComponent {
  @Input() standards!: string[]


}
