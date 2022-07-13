import { IWorkBook } from '@cirrus/models';

export function findNextLesson(workbook: IWorkBook): number {
  const nextLesson = workbook.stages.reduce((prev, curr) => {
    const nextLesson =
      prev === 0 && curr.progress.status !== 'completed'
        ? curr.lessons
            .map(l => ({ id: l.id, status: l.progress.status }))
            .reduce((prev, curr) => {
              const lesson =
                prev === 0 &&
                (curr.status === 'not_started' || curr.status === 'in_progress')
                  ? curr.id
                  : prev;
              return lesson;
            }, 0)
        : prev;
    return nextLesson;
  }, 0);

  return nextLesson;
}
