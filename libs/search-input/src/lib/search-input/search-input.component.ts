import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ISearchInputData } from '@cirrus/models';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cirrus-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Input() list!: ISearchInputData[] | null;
  @Input() title!: string;
  @Output() textOutput = new EventEmitter();
  @Output() emitSelection = new EventEmitter();

  isOpened = false;

  searchInput = new UntypedFormControl();

  ngOnInit(): void {
    this.searchInput.valueChanges.pipe(debounceTime(200)).subscribe(input => {
      this.textOutput.emit(input);
    });
  }

  clearSearchText() {
    this.searchInput.setValue('');
    this.textOutput.emit('');
  }

  selectedItem(item: ISearchInputData) {
    this.emitSelection.emit(item);
    this.focusout();
  }
  focus() {
    this.isOpened = true;
    const body = document.body;
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';
  }
  focusout() {
    this.isOpened = false;
    const body = document.body;
    body.style.overflow = 'auto';
    body.style.touchAction = 'initial';
  }
}
