export const progressIconMapper = (progress: string): string => {
  const dictionary: { [key: string]: string } = {
    ['not_started']: 'courses/images/svg/not-started.svg',
    ['in_progress']: 'courses/images/svg/in_progress.svg',
    ['completed']: 'courses/images/svg/complete_check.svg',
    ['failed']: 'courses/images/svg/in_progress.svg',
  };

  return dictionary[progress];
};
