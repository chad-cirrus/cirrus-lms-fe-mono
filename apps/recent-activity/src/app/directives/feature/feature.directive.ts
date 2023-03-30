import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { RecentActivityFacade } from '../../recent-activity-facade.service';

@Directive({
  selector: '[cirrusFeature]',
})
export class FeatureDirective implements OnInit {
  @Input() cirrusFeature!: string;

  constructor(
    private facadeService: RecentActivityFacade,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    if (this.cirrusFeature) {
      this.facadeService
        .isFeatureFlagEnabled(this.cirrusFeature)
        .subscribe(isEnabled => {
          if (isEnabled) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainerRef.clear();
          }
        });
    }
  }
}
