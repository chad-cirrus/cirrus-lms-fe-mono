import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCtcAdminModule } from '@cirrus/shared-ctc-admin';

@Component({
    selector: 'ctc-admin-sidebar',
    standalone: true,
    templateUrl: './ctc-admin-sidebar.component.html',
    styleUrl: './ctc-admin-sidebar.component.scss',
    imports: [CommonModule, SharedCtcAdminModule]
})

export class CtcAdminSidebarComponent {
}
