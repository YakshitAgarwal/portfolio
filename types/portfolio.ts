export interface ProfileLink {
  label: string;
  href: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  summary?: string;
  highlights?: readonly string[];
  stack?: readonly string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  year?: string;
  /** Live demo or project page. The project name links here. */
  href?: string;
  /** Source repository. */
  repo?: string;
  tags?: readonly string[];
}

export interface SkillGroup {
  label: string;
  items: readonly string[];
}

export interface EducationItem {
  institution: string;
  credential: string;
  period?: string;
  notes?: string;
}

/**
 * Everything the portfolio renders. Only `name` and `role` are required;
 * a section with no data is left out of the page.
 */
export interface PortfolioProps {
  name: string;
  role: string;
  bio?: string;
  location?: string;
  /** Short status shown in the header panel, e.g. "Open to work". */
  availability?: string;
  email?: string;
  links?: readonly ProfileLink[];
  skills?: readonly SkillGroup[];
  /** Newest first. */
  experience?: readonly ExperienceItem[];
  projects?: readonly ProjectItem[];
  education?: readonly EducationItem[];
}
