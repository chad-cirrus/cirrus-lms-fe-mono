export interface IProgress {
  id: number;
  status: string;
  scorm_progress?: string;
  scorm?: {
    pass: boolean;
    grade: number;
  };
}
