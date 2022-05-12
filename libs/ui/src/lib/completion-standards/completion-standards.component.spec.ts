import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionStandardsComponent } from './completion-standards.component';

describe('CompletionStandardsComponent', () => {
  let component: CompletionStandardsComponent;
  let fixture: ComponentFixture<CompletionStandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionStandardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
