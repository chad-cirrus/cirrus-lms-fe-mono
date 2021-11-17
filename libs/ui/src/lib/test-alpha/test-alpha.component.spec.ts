import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAlphaComponent } from './test-alpha.component';

describe('TestAlphaComponent', () => {
  let component: TestAlphaComponent;
  let fixture: ComponentFixture<TestAlphaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAlphaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAlphaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
