import type { Skill } from "./Skill";
import type { JobTitle } from "./JobTitle";

export interface Click {
  id: number;
  skill: Skill | null;
  job_title: JobTitle | null;
  createdAt?: string;
  updatedAt?: string;
}
