import { PROGRESS_STATUS } from '@cirrus/models';
import { formatCertificate, formatTranscript } from '../helpers/TableFormat';

export const enrollment = {
  displayedColumns: [
    'enrollment_date',
    'course_version',
    'transcript_available',
    'certificate',
  ],

  columns: [
    {
      name: 'Course Date',
      mat_col_name: 'enrollment_date',
    },
    {
      name: 'Version',
      mat_col_name: 'course_version',
    },

    {
      name: 'Transcript',
      mat_col_name: 'transcript_available',
      icon: 'courses/images/svg/download-arrow.svg',
      method: formatTranscript,
    },
    {
      name: 'Certificate',
      mat_col_name: 'certificate',
      icon: 'courses/images/svg/download-arrow.svg',
      method: formatCertificate,
    },
  ],
  data: [
    {
      id: 119066,
      course_version: '1.10',
      enrollment_date: '07/14/22 - present',
      transcript_available: false,
      progress: {
        id: 1768442,
        status: PROGRESS_STATUS.in_progress,
      },
      user_certificate: null,
    },
    {
      id: 119061,
      course_version: '1.10',
      enrollment_date: '06/16/22 - 06/16/22',
      transcript_available: true,
      progress: {
        id: 1768127,
        status: PROGRESS_STATUS.completed,
      },
      user_certificate: {
        id: 20440,
        expires_on: null,
      },
    },
  ],
};

export const task = {
  displayedColumns: [
    'name',
    'task_type',
    'required_successful_attempts',
    'passed_count',
    'missed_count',
    'status',
  ],

  columns: [
    {
      name: 'TASK',
      mat_col_name: 'name',
    },
    {
      name: 'TYPE',
      mat_col_name: 'task_type',
    },

    {
      name: 'REQUIRED',
      mat_col_name: 'required_successful_attempts',
    },
    {
      name: 'PASSED',
      mat_col_name: 'passed_count',
    },
    {
      name: 'MISSED',
      mat_col_name: 'missed_count',
    },
    {
      name: 'STATUS',
      mat_col_name: 'status',
    },
  ],
  data: [
    {
      id: 123,
      name: 'Aircraft Thing',
      standards: ['asdfasdf', 'asdf'],
      task_category: {},
      is_archived: true,
      task_type: 'practice',
      required_successful_attempts: 3,
      passed_count: 2,
      missed_count: 1,
      status: 'Not Started',
      task_attempts: [],
    },
  ],
};
