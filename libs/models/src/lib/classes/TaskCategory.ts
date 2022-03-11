export class TaskCategory {
  id: number;
  name: string;
  desc: string;
  created_at: string;
  updated_at: string;


  constructor(id: number, name: string, desc: string, created_at: string, updated_at: string) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

