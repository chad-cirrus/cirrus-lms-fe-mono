import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IACRAComponent } from './iacra.component';

describe('IACRAComponent', () => {
  let component: IACRAComponent;
  let fixture: ComponentFixture<IACRAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IACRAComponent ]
    })
    .compileComponents();
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
