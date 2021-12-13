import { IContent } from './IContent';

export interface ILesson {
  id: number;
  system_desc: string;
  created_at: string;
  updated_at: string;
  system_name: string;
  lesson_type: number;
  title: string;
  overview: string;
  is_archived?: boolean | null;
  contents_are_linear: boolean;
  is_preview: boolean;
  major_version: number;
  minor_version: number;
  contents: IContent[];
}
