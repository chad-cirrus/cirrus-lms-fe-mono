import { Pipe, PipeTransform } from '@angular/core';
import { Column } from './generic-responsive-mat-table/generic-responsive-mat-table.component';

@Pipe({
  name: 'tableFormat',
})
export class TableFormatPipe implements PipeTransform {
  transform(value: string, column: Column, row: any): string {
    const columnArg: Column = column;
    if (columnArg.method) {
      return columnArg.method(row);
    }
    return value;
  }
}
