import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRichTextComponent } from './content-rich-text.component';

describe('ContentRichTextComponent', () => {
  let component: ContentRichTextComponent;
  let fixture: ComponentFixture<ContentRichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentRichTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
