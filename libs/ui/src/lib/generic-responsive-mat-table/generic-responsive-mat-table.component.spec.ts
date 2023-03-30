import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericResponsiveMatTableComponent } from './generic-responsive-mat-table.component';
import { UiDownloadService } from '@cirrus/ui';
import { MatTableModule } from '@angular/material/table';

describe('GenericResponsiveMatTableComponent', () => {
  let component: GenericResponsiveMatTableComponent;
  let fixture: ComponentFixture<GenericResponsiveMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        MatTableModule,
      ],
      declarations: [ GenericResponsiveMatTableComponent ],
      providers: [
        { provide: UiDownloadService, useClass: MockUIDownloadService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericResponsiveMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockUIDownloadService {}
