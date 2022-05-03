import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CirrusMaterialModule, UiModule } from '@cirrus/ui';
import { PlaceholderDirective } from './PlaceHolderDirective';
import { ContentPlayerDialogService } from './content-player-dialog.service';
import { ContentPlayerComponent } from './content-player/content-player.component';
import { ScormComponent } from './content-player/scorm/scorm.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    CirrusMaterialModule,
    UiModule,
  ],
  declarations: [ContentPlayerComponent, ScormComponent, PlaceholderDirective],
  providers: [ContentPlayerDialogService],
})
export class ContentPlayerModule {}
