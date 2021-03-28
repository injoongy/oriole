export interface Project {
  project: {
    name: string;
    id: number;
  };
  task_assignments: {
    task: {
      name: string;
      id: number;
    };
  }[];
}

export interface FormattedProject {
  label: string;
  value: number;
}

export interface FormattedTask {
  label: string;
  value: number;
}

export interface Error {
  status: string;
}

export interface Selections {
  projectName?: string;
  taskName?: string;
}
