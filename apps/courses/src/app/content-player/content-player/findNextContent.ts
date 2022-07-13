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
  payLoad: INextContentRequest,
  lesson: ILesson,
  _menuItems: IContentPlayerMenuItem[],
  _currentId: number
): INextContentResponse => ({
  state: 'initial',
  content: lesson.contents.find(c => c.id === payLoad.id) as IContent,
});

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

const getNextContent = (
  _payLoad: INextContentRequest,
  lesson: ILesson,
  menuItems: IContentPlayerMenuItem[],
  currentId: number
): INextContentResponse =>
  nextIndex(menuItems, currentId) !== menuItems.length
    ? {
        state: 'next',
        content: lesson.contents[nextIndex(menuItems, currentId)],
      }
    : incompleteMenuItems(menuItems).length > 0
    ? {
        state: 'next-incomplete',
        content: lesson.contents.find(
          c => c.id === incompleteMenuItems(menuItems)[0].id
        ),
      }
    : { state: 'lesson-complete', content: undefined };

const getPrevContent = (
  _payLoad: INextContentRequest,
  lesson: ILesson,
  menuItems: IContentPlayerMenuItem[],
  currentId: number
): INextContentResponse =>
  prevIndex(menuItems, currentId) > -1
    ? {
        state: 'prev',
        content: lesson.contents[prevIndex(menuItems, currentId)],
      }
    : { state: 'no-prev', content: undefined };

type contentFn = (
  payLoad: INextContentRequest,
  lesson: ILesson,
  menuItems: IContentPlayerMenuItem[],
  currentId: number
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
  currentId: number
): INextContentResponse {
  return contentFnDictionary[payLoad.type](
    payLoad,
    lesson,
    menuItems,
    currentId
  );
}
