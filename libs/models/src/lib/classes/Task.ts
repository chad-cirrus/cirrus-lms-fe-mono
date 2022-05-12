import { ITask } from '../IContent';
import { TaskCategory } from './TaskCategory';

export class Task implements ITask {
  id: number;
  name: string;
  standards: string[];
  task_category: TaskCategory;
  is_archived: boolean;
  deferments: [];
  missed_count: number;
  passed_count: number;
  required_successful_attempts: number;
  status: string;
  task_attempts: [];
  task_type: string;


  constructor(
    id: number,
    name: string,
    standards: string[],
    task_category: TaskCategory,
    is_archived: boolean,
    deferments: [],
    missed_count: number,
    passed_count: number,
    required_successful_attempts: number,
    status: string,
    task_attempts: [],
    task_type: string
  ) {
    this.id = id;
    this.name = name;
    this.standards = standards;
    this.task_category = task_category;
    this.is_archived = is_archived;
    this.deferments = deferments
    this.missed_count= missed_count,
    this.passed_count= passed_count,
    this.required_successful_attempts= required_successful_attempts,
    this.status= status,
    this.task_attempts= task_attempts,
    this.task_type= task_type
  }
}
