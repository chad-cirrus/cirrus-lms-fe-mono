import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IACRAComponent } from './iacra.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('IACRAComponent', () => {
  let component: IACRAComponent;
  let fixture: ComponentFixture<IACRAComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IACRAComponent ],
      providers:[
        provideMockStore(),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IACRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
