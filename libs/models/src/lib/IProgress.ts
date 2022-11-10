export interface IProgress {
  id: number;
  status: string;
  scorm?: {
    pass: boolean;
    grade: number;
  };
}
