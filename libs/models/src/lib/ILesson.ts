/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContent } from './IContent';
import { IProgress } from './IProgress';
import { ProgressType } from './ProgressType';

export interface ILesson {
  id: number;
  system_name: string;
  lesson_type: number;
  subtitle: string;
  order: number;
  title: string;
  system_desc: string;
  overview: string;
  is_archived: boolean;
  is_preview: boolean;
  instructor_overview: string;
  contents_are_linear: boolean;
  major_version: number;
  minor_version: number;
  updated_at: string;
  contents: IContent[];
  overview_image_url: string;
  student_intro_video: StudentIntroVideo;
  instructor_intro_video?: InstructorIntroVideo;
  instructor_contents: IContent[];
  progress: IProgress;
  course_id: number;
  course_attempt_id: number;
  stage_id: number;
  thumbnail_image_url: string;
  mobile_hero_image_url: string;
  desktop_hero_image_url: string;
  progress_stats: ProgressStat[];
}

export interface ProgressStat {
  type: ProgressType;
  completed: number;
  total: number;
  status: string;
}

export interface StudentIntroVideo {
  content: IContent;
  content_id: number;
  created_at: string;
  hidden: boolean;
  required: boolean;
  id: number;
  title: string;
  updated_at: string;
}

export interface InstructorIntroVideo {
  content_id: number;
  created_at: string;
  hidden: boolean;
  required: boolean;
  id: number;
  title: string;
  updated_at: string;
}

export enum LessonProgress {
  Unknown,
  NotStarted,
  InProgress,
  Complete,
  NotRequired,
}

export const NullLesson: ILesson = {
  id: 0,
  system_desc: '',
  updated_at: '',
  system_name: '',
  subtitle: '',
  thumbnail_image_url: '',
  mobile_hero_image_url: '',
  desktop_hero_image_url: '',
  lesson_type: 0,
  title: '',
  overview: '',
  is_archived: false,
  contents_are_linear: false,
  is_preview: false,
  major_version: 0,
  minor_version: 0,
  contents: [],
  order: 0,
  overview_image_url: '',
  student_intro_video: {
    content: {
      blob_directory: '',
      order: 0,
      quiz: '',
      content_tasks: [],
      progress: { id: 1, status: 'not_completed' },
      content_file: '',
      content_filename: '',
      content_html: '',
      content_type: 0,
      created_by: 'Cirrus Aircraft',
      desc: 'Perspective & Perspective+ Avionics Course',
      id: 401,
      jet_scoring: false,
      meta_tags: [],
      placeholder_image:
        'https://cirrusapproachherokuprod.blob.core.windows.net/cirruslmsherokuprodcontainer/content-items/content-files/5c480eb38443724475091bf0d91ba12.2.png',
      score: 0,
      show_comments: true,
      starter_file: '',
      subtitle: 'Hello Cockpit [2.1]',
      title: 'Hello Cockpit [2.1]',
      upload_image: '',
      url: '309005652',
    },

    content_id: 401,
    hidden: false,
    required: false,
    id: 1,
    title: '',
    updated_at: '',
    created_at: '',
  },
  instructor_intro_video: {
    content_id: 401,
    created_at: '2022-05-18T15:55:59.249Z',
    hidden: false,
    id: 69,
    required: false,
    title: 'hello',
    updated_at: '2022-05-18T15:55:59.249Z',
  },
  instructor_overview: '',
  instructor_contents: [],
  progress: {
    id: 0,
    status: 'unknown',
  },
  course_id: 0,
  course_attempt_id: 0,
  stage_id: 0,
  progress_stats: [],
};
