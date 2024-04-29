import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtcAdminSidebarComponent } from './ctc-admin-sidebar.component';

describe('CtcAdminSidebarComponent', () => {
  let component: CtcAdminSidebarComponent;
  let fixture: ComponentFixture<CtcAdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtcAdminSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtcAdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
