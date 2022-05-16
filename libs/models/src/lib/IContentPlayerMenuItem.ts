import { IProgress } from './IProgress';

export interface IContentPlayerMenuItem {
  icon: string;
  text: string;
  id: number;
  progress: IProgress;
}
