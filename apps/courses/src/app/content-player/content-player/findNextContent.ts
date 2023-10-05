/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IContent,
  IContentPlayerMenuItem,
  ILesson,
  PROGRESS_STATUS,
} from '@cirrus/models';
import { INextContentRequest } from './content-player.component';

export interface INextContentResponse {
  state: string;
  content: IContent | undefined;
}

const getInitialContent = (
  payload: INextContentRequest,
  lesson: ILesson,
  _menuItems: IContentPlayerMenuItem[],
  _currentId: number,
  instructorView: boolean
): INextContentResponse => {
  const lessonContents = instructorView ? lesson.instructor_contents : lesson.contents;

  return {
    state: 'initial',
    content: lessonContents.find(c => c.id === payload.id) as IContent,
  }
};

const nextIndex = (
  menuItems: IContentPlayerMenuItem[],
  currentId: number
): number => menuItems.map(i => i.id).indexOf(currentId) + 1;

const prevIndex = (
  menuItems: IContentPlayerMenuItem[],
  currentId: number
): number => menuItems.map(i => i.id).indexOf(currentId) - 1;

const incompleteMenuItems = (
  items: IContentPlayerMenuItem[]
): IContentPlayerMenuItem[] =>
  items
    .slice(0, -1)
    .filter(item => item.progress.status !== PROGRESS_STATUS.completed);


export const getNextContent = (
  _payLoad: INextContentRequest,
  lesson: ILesson,
  menuItems: IContentPlayerMenuItem[],
  currentId: number,
  instructorView: boolean
): INextContentResponse => {
  const nextContentIndex = nextIndex(menuItems, currentId);

  if (instructorView) {
    return getNextInstructorContent(currentId, menuItems, lesson);
  }
  // check to see if item is not last item in content
  if (nextContentIndex !== menuItems.length) {
    return {
      state: 'next',
      content: lesson.contents[nextContentIndex],
    }
  // check to see if there are any incomplete content items in menu items arr
  } else if (incompleteMenuItems(menuItems).length > 0) {
    return {
      state: 'next-incomplete',
      content: lesson.contents.find(
        c => c.id === incompleteMenuItems(menuItems)[0].id
      ),
    }
  }
  // returns completed lesson state when on last item and there are no incomplete items left
  return { state: 'lesson-complete', content: undefined }
};

const getNextInstructorContent = (
  currentId: number,
  menuItems: IContentPlayerMenuItem[],
  lesson: ILesson): INextContentResponse => {
  let nextContentIndex = nextIndex(menuItems, currentId);
  if (nextContentIndex === menuItems.length) {
    nextContentIndex = 0;
  }

  return {
    state: 'next',
    content: lesson.instructor_contents[nextContentIndex]
  }
}

const getPrevContent = (
  _payLoad: INextContentRequest,
  lesson: ILesson,
  menuItems: IContentPlayerMenuItem[],
  currentId: number,
  instructorView: boolean
): INextContentResponse => {
  if (instructorView) {
    return getPrevInstructorContent(currentId, menuItems, lesson);
  }

  return prevIndex(menuItems, currentId) > -1
    ? {
        state: 'prev',
        content: lesson.contents[prevIndex(menuItems, currentId)],
      }
    : { state: 'no-prev', content: undefined };
}

const getPrevInstructorContent = (
  currentId: number,
  menuItems: IContentPlayerMenuItem[],
  lesson: ILesson): INextContentResponse => {
  let prevContentIndex = prevIndex(menuItems, currentId);

  if (prevContentIndex < 0) {
    prevContentIndex = menuItems.length - 1;
  }

  return {
    state: 'prev',
    content: lesson.instructor_contents[prevContentIndex]
  }
}

type contentFn = (
  payLoad: INextContentRequest,
  lesson: ILesson,
  menuItems: IContentPlayerMenuItem[],
  currentId: number,
  instructorView: boolean
) => INextContentResponse;

const contentFnDictionary: { [key: string]: contentFn } = {
  ['initial']: getInitialContent,
  ['prev']: getPrevContent,
  ['next']: getNextContent,
};

export function findNextContent(
  payLoad: INextContentRequest,
  lesson: ILesson,
  menuItems: IContentPlayerMenuItem[],
  currentId: number,
  instructorView: boolean
): INextContentResponse {
  return contentFnDictionary[payLoad.type](
    payLoad,
    lesson,
    menuItems,
    currentId,
    instructorView
  );
}
