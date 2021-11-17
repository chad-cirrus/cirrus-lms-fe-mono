import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestAlphaComponent } from './test-alpha/test-alpha.component';
import { CirrusMaterialModule } from './cirrus-material.module';

@NgModule({
  imports: [CommonModule, CirrusMaterialModule],
  declarations: [TestAlphaComponent],
  exports: [TestAlphaComponent],
})
export class UiModule {}
