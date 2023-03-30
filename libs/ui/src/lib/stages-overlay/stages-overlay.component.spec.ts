import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesOverlayComponent } from './stages-overlay.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { courseOverview } from '@cirrus/models';

describe('StagesOverlayComponent', () => {
  let component: StagesOverlayComponent;
  let fixture: ComponentFixture<StagesOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdkAccordionModule],
      declarations: [ StagesOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesOverlayComponent);
    component = fixture.componentInstance;
    component.courseOverview = courseOverview;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
