import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { UiDownloadService } from '../course-completion/ui-download.service';

@Component({
  selector: 'cirrus-generic-responsive-mat-table',
  templateUrl: './generic-responsive-mat-table.component.html',
  styleUrls: ['./generic-responsive-mat-table.component.scss'],
})
export class GenericResponsiveMatTableComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<any>([]);
  private _data!: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() displayedColumns!: string[];
  @Input() columns!: Column[];
  @Output() emitValue = new EventEmitter();
  @Output() emitRow = new EventEmitter();
  loading$ = this.uiDownloadService.loading$;

  @Input()
  set data(value: any) {
    this.dataSource.data = value;
  }

  get data() {
    return this._data;
  }

  selectedCourseAttemptId$ = this.uiDownloadService.selectedCourseAttemptId$;

  constructor(private uiDownloadService: UiDownloadService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;x
  }

  rowSelect(row: any) {
    this.emitRow.emit(row);
  }

  valueSelect($event: MouseEvent, value: any, type: Column) {
    console.log('vai;e', value);
    if (value.id) {
      this.uiDownloadService.setSelectedId(value.id);
    }
    const obj = { value, type };
    $event.stopPropagation();
    this.emitValue.emit(obj);
  }
}

export interface Column {
  name: string;
  mat_col_name: string;
  alias?: string;
  icon?: string;
  method?: formatFn;
  isLoading?: boolean;
}

interface formatFn {
  (row: []): string;
}
