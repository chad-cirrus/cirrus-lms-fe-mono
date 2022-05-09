export const mapContentTypeToIcon = (contentType: number): string => {
  const dictionary: { [key: number]: string } = {
    [0]: 'courses/images/svg/video_play.svg',
    [2]: 'courses/images/svg/quiz_lc_icon.svg',
    [4]: 'courses/images/svg/document_button.svg',
    [5]: 'courses/images/svg/quiz_lc_icon.svg',
    [6]: 'courses/images/svg/document_button.svg',
    [7]: 'courses/images/svg/interactive_html.svg',
    [8]: 'courses/images/svg/rich_text_icon.svg',
    [9]: 'courses/images/svg/assessment_lc_icon.svg',
    [10]: 'courses/images/svg/assessment_lc_icon.svg',
    [11]: 'courses/images/svg/image_lc_icon.svg',
  };

  return dictionary[contentType] || '';
};
