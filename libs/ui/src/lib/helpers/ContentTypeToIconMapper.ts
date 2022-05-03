export function mapContentTypeToIcon(contentType: number): string {
  switch (contentType) {
    case 0:
      return 'courses/images/svg/video_play.svg';
    case 2:
      return 'courses/images/svg/quiz_lc_icon.svg';
    case 4:
      return 'courses/images/svg/document_button.svg';
    case 5:
      return 'courses/images/svg/quiz_lc_icon.svg';
    case 6:
      return 'courses/images/svg/document_button.svg';
    case 8:
      return 'courses/images/svg/rich_text_icon.svg';
    case 9:
      return 'courses/images/svg/assessment_lc_icon.svg';
    case 10:
      return 'courses/images/svg/assessment_lc_icon.svg';
    case 11:
      return 'courses/images/svg/image_lc_icon.svg';
    default:
      return 'courses/images/svg/document_button.svg';
  }
}
