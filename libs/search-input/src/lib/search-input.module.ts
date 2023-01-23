import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './search-input/search-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatFilterPipe } from './formatfilter.pipe';

@NgModule({
  imports: [CommonModule, MatAutocompleteModule, ReactiveFormsModule],
  declarations: [SearchInputComponent, FormatFilterPipe],
  exports: [SearchInputComponent, FormatFilterPipe],
})
export class SearchInputModule {}
