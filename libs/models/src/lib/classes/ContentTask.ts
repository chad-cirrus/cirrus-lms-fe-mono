import { IContentTask } from '../IContent';
import { Task } from './Task';

export class ContentTask implements IContentTask {
  id: number;
  task: Task;
  content_id: number;
  required_successful_attempts: number;
  order: number;
  task_id: number;
  task_type: string;

  constructor(
    id: number,
    task: Task,
    content_id: number,
    required_successful_attempts: number,
    order: number,
    task_id: number,
    task_type: string
  ) {
    this.id = id;
    this.task = task;
    this.content_id = content_id;
    this.required_successful_attempts = required_successful_attempts;
    this.order = order;
    this.task_id = task_id;
    this.task_type = task_type;
  }
}
