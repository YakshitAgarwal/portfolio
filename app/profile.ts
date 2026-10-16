import type { PortfolioProps } from "@/types/portfolio";

/**
 * Your details go here. The page renders entirely from this object, so
 * nothing else needs editing. Replace every placeholder below. Delete an
 * entry or leave an array empty and that section disappears.
 */
export const profile: PortfolioProps = {
  name: "Yakshit Agarwal",
  role: "Blockchain Engineer",
  bio: "Hi, I am Yakshit, a blockchain developer, currently in my final year at IIT (ISM) Dhanbad. I have been working in the blockchain space for a little over 2 years and am excited to build new stuff.",
  location: "Mumbai, India",
  availability: "Open to work",
  email: "yakshitagarwal05@gmail.com",
  // Put your PDF in public/ and point to it. Leave this out to hide the button.
  resumeUrl: "/Yakshit_Agarwal_Blockchain_Developer.pdf",
  resumeFileName: "Yakshit_Agarwal_Blockchain_Developer.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/YakshitAgarwal" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yakshit-agarwal-323340285/",
    },
    { label: "Twitter", href: "https://x.com/YakshitAgarwal" },
  ],
  // Newest first. Each entry becomes a block linked to the one before it.
  experience: [
    {
      role: "Open source contributor",
      company: "OnlyDust",
      period: "Aug 2025 to Sept 2025",
      highlights: ["What you built and the result it had."],
      stack: ["Tool"],
    },
    {
      role: "Open source contributor",
      company: "OnlyDust",
      period: "Aug 2025 to Sept 2025",
      highlights: ["What you built and the result it had."],
      stack: ["Tool"],
    },
  ],
  projects: [
    {
      name: "CryptoJar",
      description: "What it does and who it is for.",
      year: "2026 (ongoing)",
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
  hackathons: [
    {
      name: "Etherlink",
      result: "Finalist",
      prize: "edfwe",
      year: "2025",
      project: "Argumint",
      description:
        "What you built in the time you had, in one or two sentences.",
      href: "https://example.com",
      repo: "https://github.com/your-handle/project",
      tags: ["Tag", "Tag"],
    },
    {
      name: "Etherlink",
      result: "Finalist",
      prize: "",
      year: "2025",
      project: "Argumint",
      description:
        "What you built in the time you had, in one or two sentences.",
      href: "https://example.com",
      repo: "https://github.com/your-handle/project",
      tags: ["Tag", "Tag"],
    },
  ],
  skills: [
    {
      label: "Languages",
      items: ["Go", "Solidity", "TypeScript/JavaScript", "C/C++"],
    },
    { label: "Frameworks", items: ["Next.js", ""] },
    { label: "Tools", items: ["Tool", "Tool"] },
  ],
  education: [
    {
      institution: "Indian Institute of Technology",
      credential: "Bachelor of Technology in Mechanical Engineering",
      period: "2023 to 2027",
    },
  ],
};
