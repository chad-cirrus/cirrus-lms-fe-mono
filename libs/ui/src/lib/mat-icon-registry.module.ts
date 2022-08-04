import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [HttpClientModule],
})
export class MatIconRegistryModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry
      .addSvgIcon(
        'eye',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/eye.svg'
        )
      )
      .addSvgIcon(
        'open_lessons',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/open_lessons.svg'
        )
      )
      .addSvgIcon(
        'milestone',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/milestone.svg'
        )
      )
      .addSvgIcon(
        'play',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/video_play.svg'
        )
      )
      .addSvgIcon(
        'enrollment_history',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'courses/images/svg/enrollment_history.svg'
        )
      );
  }
}
