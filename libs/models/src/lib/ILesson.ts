import { IProgress } from '..';
import { IContent } from './IContent';

export interface ILesson {
  title: string;
  subTitle: string;
  progess: IProgress[];
  id: number;
  system_desc: string;
  created_at: string;
  updated_at: string;
  system_name: string;
  lesson_type: number;
  overview: string;
  is_archived?: boolean | null;
  contents_are_linear: boolean;
  is_preview: boolean;
  major_version: number;
  minor_version: number;
  contents: IContent[];
}
