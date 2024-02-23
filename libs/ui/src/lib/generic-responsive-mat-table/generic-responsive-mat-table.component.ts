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
import { ICertificate } from '@cirrus/models';

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
  @Output() emitCertificate = new EventEmitter();

  @Input()
  set data(value: any) {
    this.dataSource.data = value;
  }

  get data() {
    return this._data;
  }

  selectedCertificateId :number | undefined = undefined;
  selectedRowId$ = this.uiDownloadService.selectedRowId$;

  constructor(private uiDownloadService: UiDownloadService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  rowSelect(row: any) {
    this.emitRow.emit(row);
  }

  certificateSelect(certificate: ICertificate) {
    this.emitCertificate.emit(certificate);
    this.selectedCertificateId = certificate.id;
  }

  valueSelect($event: MouseEvent, value: any, type: Column) {
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
  isLoading$?: Observable<boolean>;
}

interface formatFn {
  (row: []): string;
}
