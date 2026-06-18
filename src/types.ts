export interface Course {
  name: string;
  grade?: string;
  uts?: number;
}

export interface SkillGapItem {
  name: string;
  status: "GAP" | "OK";
  level?: "Tinggi" | "Sedang" | "Rendah";
}

export interface SemesterData {
  number: number;
  name: string;
  academicYear: string;
  status: "completed" | "current" | "future";
  sks: number;
  cumulativeSks: number;
  ipk: number;
  cumulativeIpk: number;
  courses: Course[];
  skills: string[];
  gaps?: SkillGapItem[];
  aiInsight: string;
  aiAction?: string;
  aiProjection?: string;
}

export interface CareerMatch {
  title: string;
  companyType: string;
  matchPercent: number;
  salaryRange: string;
  masteredSkills: string[];
  gapSkills: string[];
}

export interface ActionCard {
  title: string;
  platform: string;
  duration: string;
  cost: string;
  buttonText: string;
}

export interface ChapterSkill {
  name: string;
  status: "Dikuasai" | "GAP" | "LOCKED";
  priority?: "Tinggi" | "Sedang" | "Rendah";
  actionCard?: ActionCard;
}

export interface SkillChapter {
  id: string;
  number: number;
  title: string;
  status: "completed" | "in_progress" | "locked";
  progressText?: string;
  skills: ChapterSkill[];
  aiLockedNote?: string;
}

export interface Mentor {
  id: string;
  name: string;
  initials: string;
  batch: string;
  role: string;
  company: string;
  location: string;
  experience: string;
  aiReason: string;
  tags: string[];
  similarity: string[];
}

export interface Internship {
  id: string;
  company: string;
  program: string;
  role: string;
  duration: string;
  sks: number;
  location: string;
  matchScore: number;
  skillsMatch: string[];
  skillsToDevelop: string[];
  aiReason: string;
  badge?: string;
}

export interface ActionPlan {
  month: string;
  title: string;
  resource: string;
  target: string;
  outcome: string;
  progress: number;
  borderColor: string;
}
