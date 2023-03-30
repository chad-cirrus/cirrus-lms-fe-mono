import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from './clickoutside.directive';

@Component({
  template:
    '<div id="inside" cirrusClickOutside ><h1></h1> Our directive is attatched to this element </div><div id="outside"><h2></h2></div>',
})
class ParentComponent {}

describe('ClickoutsideDirective', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;
  let directive: ClickOutsideDirective;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, ParentComponent],
      providers: [ClickOutsideDirective],
    });
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
  });

  it('clicking inside element with attribute', () => {
    directive = fixture.debugElement
      .query(By.directive(ClickOutsideDirective))
      .injector.get(ClickOutsideDirective) as ClickOutsideDirective;
    spy = jest.spyOn(directive.clickOutside, 'emit');
    const h1 = fixture.debugElement.query(By.css('h1'));
    h1.nativeElement.click();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('clicking outside element with attribute', () => {
    directive = fixture.debugElement
      .query(By.directive(ClickOutsideDirective))
      .injector.get(ClickOutsideDirective) as ClickOutsideDirective;
    spy = jest.spyOn(directive.clickOutside, 'emit');
    const h2 = fixture.debugElement.query(By.css('h2'));
    h2.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
