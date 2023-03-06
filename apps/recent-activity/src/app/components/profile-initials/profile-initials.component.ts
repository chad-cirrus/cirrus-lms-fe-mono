import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cirrus-profile-initials',
  templateUrl: './profile-initials.component.html',
  styleUrls: ['./profile-initials.component.scss'],
})
export class ProfileInitialsComponent {
  @Input() firstName!: string;
  @Input() lastName!: string;
}
