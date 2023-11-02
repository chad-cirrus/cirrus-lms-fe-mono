import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IACRAComponent } from './iacra.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IacraStat } from '../../../models/IRecentActivity';
import { ImageFormatterPipe } from '../../../image-formatter.pipe';
import { FormatIacraTypePipe } from './format-iacra-type.pipe';

describe('IACRAComponent', () => {
  let component: IACRAComponent;
  let fixture: ComponentFixture<IACRAComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IACRAComponent, ImageFormatterPipe, FormatIacraTypePipe ],
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

  it('should correctly format the iacra stats', () => {
    component.iacraStats = mockIacraStats();
    fixture.detectChanges();
    const iacraElement = fixture.debugElement.nativeElement;
    const iacraStatsElement = iacraElement.querySelectorAll('.total');
    expect(iacraStatsElement[0].textContent).toEqual('10.0');
    expect(iacraStatsElement[1].textContent).toEqual('24.4');
    expect(iacraStatsElement[2].textContent).toEqual('23.0');
    expect(iacraStatsElement[3].textContent).toEqual('3');
    expect(iacraStatsElement[4].textContent).toEqual('3');
    expect(iacraStatsElement[5].textContent).toEqual('42.0');
    expect(iacraStatsElement[6].textContent).toEqual('279.5');
    expect(iacraStatsElement[7].textContent).toEqual('5.0');
    expect(iacraStatsElement[8].textContent).toEqual('24.0');
    expect(iacraStatsElement[9].textContent).toEqual('23.0');
    expect(iacraStatsElement[10].textContent).toEqual('12.0');
    expect(iacraStatsElement[11].textContent).toEqual('23.2');
  });

  it('should not display stats when iacraStats is empty', () => {
    component.iacraStats = [];
    fixture.detectChanges();
    const iacraElement = fixture.debugElement.nativeElement;
    const iacraStatsElement = iacraElement.querySelectorAll('.total');
    expect(iacraStatsElement[0]).toBeFalsy();
  });
});

function mockIacraStats(): IacraStat[] {
  return [
    {
        type: 'completed_dual_received_hours',
        completed: 10
    },
    {
        type: 'completed_solo_hours',
        completed: 24.45
    },
    {
        type: 'completed_pic_hours',
        completed: 23
    },
    {
        type: 'completed_night_takeoffs',
        completed: 3
    },
    {
        type: 'completed_night_landings',
        completed: 3
    },
    {
        type: 'completed_actual_instrument_hours',
        completed: 42
    },
    {
        type: 'completed_total_hours',
        completed: 279.5
    },
    {
        type: 'completed_cross_country_dual_hours',
        completed: 5
    },
    {
        type: 'completed_cross_country_solo_hours',
        completed: 24
    },
    {
        type: 'completed_cross_country_pic_hours',
        completed: 23
    },
    {
        type: 'completed_night_dual_received_hours',
        completed: 12
    },
    {
        type: 'completed_night_pic_hours',
        completed: 23.2345
    }
  ];
}