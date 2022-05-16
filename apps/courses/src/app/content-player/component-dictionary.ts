import { CONTENT_TYPE } from '@cirrus/models';
import {
  VideoPlayerComponent,
  DownloadContentComponent,
  ContentRichTextComponent,
  ContentImageComponent,
  AssessmentComponent,
  InteractiveComponent,
} from '@cirrus/ui';
import { ScormComponent } from './content-player/scorm/scorm.component';

export const componentDictionary = {
  [CONTENT_TYPE.vimeo]: VideoPlayerComponent,
  [CONTENT_TYPE.scorm]: ScormComponent,
  [CONTENT_TYPE.download]: DownloadContentComponent,
  [CONTENT_TYPE.richText]: ContentRichTextComponent,
  [CONTENT_TYPE.image]: ContentImageComponent,
  [CONTENT_TYPE.flight_assessment]: AssessmentComponent,
  [CONTENT_TYPE.ground_assessment]: AssessmentComponent,
  [CONTENT_TYPE.interactive]: InteractiveComponent,
};
