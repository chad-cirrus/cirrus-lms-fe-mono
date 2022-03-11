import { ITask } from '../IContent';
import { TaskCategory } from './TaskCategory';

export class Task implements ITask {
  id: number;
  name: string;
  standards: string[];
  task_category: TaskCategory;
  is_archived: boolean;

  constructor(
    id: number,
    name: string,
    standards: string[],
    task_category: TaskCategory,
    is_archived: boolean
  ) {
    this.id = id;
    this.name = name;
    this.standards = standards;
    this.task_category = task_category;
    this.is_archived = is_archived;
  }
}
