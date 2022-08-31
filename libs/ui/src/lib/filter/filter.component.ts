import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FilterMenuSection } from '@cirrus/models';

@Component({
  selector: 'cirrus-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() sections!: FilterMenuSection[];
  @Input() checkboxArray!: FormArray;

  onChange(item: string) {
    const index = this.checkboxArray.value.indexOf(item);
    index === -1
      ? this.checkboxArray.push(new FormControl(item))
      : this.checkboxArray.removeAt(index);
  }
  stopProp($event: Event) {
    $event.stopPropagation();
  }
}
