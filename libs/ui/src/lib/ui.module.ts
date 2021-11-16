import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestAlphaComponent } from './test-alpha/test-alpha.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TestAlphaComponent
  ],
  exports: [
    TestAlphaComponent
  ],
})
export class UiModule {}
