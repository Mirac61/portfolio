export type ProjectStatus = 'in arbeit' | 'prototyp' | 'mvp fertig';

export interface Project {
  id: string;
  name: string;
  title: string;
  type: string;
  lang: string;
  path: string;
  desc: string;
  status: ProjectStatus;
  meta: Record<string, string>;
}
