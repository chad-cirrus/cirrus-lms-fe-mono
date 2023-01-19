import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge/badge.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [CommonModule, MatBadgeModule],
  declarations: [BadgeComponent],
  exports: [BadgeComponent],
})
export class BadgeModule {}
