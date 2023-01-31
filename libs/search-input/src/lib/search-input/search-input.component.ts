import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  searchInput = new FormControl();

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
  }
  focus(){
    const body = document.body;
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
  }
  focusout(){
    const body = document.body;
    body.style.overflow = "auto";
    body.style.touchAction = "initial";
  }
}
