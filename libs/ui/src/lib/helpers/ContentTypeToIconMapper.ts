import { CONTENT_TYPE } from '@cirrus/models';

export const mapContentTypeToIcon = (contentType: number): string => {
  const dictionary: { [key: number]: string } = {
    [CONTENT_TYPE.vimeo]: 'courses/images/svg/video_play.svg',
    [CONTENT_TYPE.scorm]: 'courses/images/svg/quiz_lc_icon.svg',
    [CONTENT_TYPE.pdf]: 'courses/images/svg/document_button.svg',
    [CONTENT_TYPE.quiz]: 'courses/images/svg/quiz_lc_icon.svg',
    [CONTENT_TYPE.download]: 'courses/images/svg/document_button.svg',
    [CONTENT_TYPE.interactive]: 'courses/images/svg/interactive_html.svg',
    [CONTENT_TYPE.richText]: 'courses/images/svg/rich_text_icon.svg',
    [CONTENT_TYPE.flight_assessment]:
      'courses/images/svg/assessment_lc_icon.svg',
    [CONTENT_TYPE.ground_assessment]:
      'courses/images/svg/assessment_lc_icon.svg',
    [CONTENT_TYPE.image]: 'courses/images/svg/image_lc_icon.svg',
  };

  return dictionary[contentType] || '';
};
