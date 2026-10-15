import type { PortfolioProps } from "@/types/portfolio";

/**
 * Your details go here. The page renders entirely from this object, so
 * nothing else needs editing. Replace every placeholder below. Delete an
 * entry or leave an array empty and that section disappears.
 */
export const profile: PortfolioProps = {
  name: "Your Name",
  role: "Your role",
  bio: "Two or three sentences on what you build and what you care about.",
  location: "City, Country",
  availability: "Open to work",
  email: "you@example.com",
  links: [
    { label: "GitHub", href: "https://github.com/YakshitAgarwal" },
    { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
    { label: "Twitter", href: "https://twitter.com/your-handle" },
  ],
  // Newest first. Each entry becomes a block linked to the one before it.
  experience: [
    {
      role: "Role title",
      company: "Company",
      companyUrl: "https://example.com",
      period: "2024 to now",
      location: "Remote",
      highlights: ["What you built and the result it had."],
      stack: ["Tool", "Tool"],
    },
    {
      role: "Role title",
      company: "Company",
      period: "2022 to 2024",
      highlights: ["What you built and the result it had."],
      stack: ["Tool"],
    },
  ],
  projects: [
    {
      name: "Project name",
      description: "What it does and who it is for.",
      year: "2025",
      href: "https://example.com",
      repo: "https://github.com/your-handle/project",
      tags: ["Tag", "Tag"],
    },
    {
      name: "Project name",
      description: "What it does and who it is for.",
      year: "2024",
      tags: ["Tag"],
    },
  ],
  skills: [
    { label: "Languages", items: ["Language", "Language"] },
    { label: "Frameworks", items: ["Framework", "Framework"] },
    { label: "Tools", items: ["Tool", "Tool"] },
  ],
  education: [
    {
      institution: "Institution",
      credential: "Degree or course",
      period: "2020 to 2024",
    },
  ],
};
