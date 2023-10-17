import { CONTENT_TYPE } from '@cirrus/models';
import {
  VideoPlayerComponent,
  ContentRichTextComponent,
  ContentImageComponent,
  AssessmentComponent,
  InteractiveComponent,
  PdfComponent,
} from '@cirrus/ui';
import { ScormComponent } from './content-player/scorm/scorm.component';
import { QuizComponent } from './content-player/quiz/quiz.component';

export const componentDictionary = {
  [CONTENT_TYPE.vimeo]: VideoPlayerComponent,
  [CONTENT_TYPE.scorm]: ScormComponent,
  [CONTENT_TYPE.download]: PdfComponent,
  [CONTENT_TYPE.richText]: ContentRichTextComponent,
  [CONTENT_TYPE.image]: ContentImageComponent,
  [CONTENT_TYPE.flight_assessment]: AssessmentComponent,
  [CONTENT_TYPE.ground_assessment]: AssessmentComponent,
  [CONTENT_TYPE.interactive]: InteractiveComponent,
  [CONTENT_TYPE.quiz]: QuizComponent,
};
