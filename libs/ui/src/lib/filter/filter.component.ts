import { Component, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, FormGroup } from '@angular/forms';
import { FilterMenuSection } from '@cirrus/models';

@Component({
  selector: 'cirrus-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() sections!: FilterMenuSection[];
  @Input() checkboxArray!: UntypedFormArray;

  onChange(item: string) {
    const index = this.checkboxArray.value.indexOf(item);
    index === -1
      ? this.checkboxArray.push(new UntypedFormControl(item))
      : this.checkboxArray.removeAt(index);
  }
  stopProp($event: Event) {
    $event.stopPropagation();
  }
}
