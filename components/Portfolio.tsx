import type { ReactElement, ReactNode } from "react";
import ScrambleHash from "@/components/ScrambleHash";
import { buildChain, headHash, shortHash } from "@/lib/chain";
import { safeHref } from "@/lib/links";
import type { PortfolioProps, ProfileLink } from "@/types/portfolio";

interface AnchorProps {
  href: string;
  className?: string;
  children: ReactNode;
}

function Anchor({ href, className, children }: AnchorProps): ReactElement {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className ? `text-link ${className}` : "text-link"}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function Tags({ items }: { items: readonly string[] }): ReactElement | null {
  if (items.length === 0) return null;
  return (
    <ul className="tags">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="tag">
          {item}
        </li>
      ))}
    </ul>
  );
}

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

function Section({ id, title, children }: SectionProps): ReactElement {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="shell">
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function Portfolio({
  name,
  role,
  bio,
  location,
  availability,
  email,
  links = [],
  skills = [],
  experience = [],
  projects = [],
  education = [],
}: PortfolioProps): ReactElement {
  const blocks = buildChain(experience);
  const head = headHash(name, blocks);
  const mailHref = safeHref(email ? `mailto:${email}` : undefined);
  const profileLinks = links.flatMap<ProfileLink>(({ label, href }) => {
    const safe = safeHref(href);
    return safe ? [{ label, href: safe }] : [];
  });

  const nav = [
    { id: "experience", label: "Experience", show: blocks.length > 0 },
    { id: "projects", label: "Projects", show: projects.length > 0 },
    { id: "skills", label: "Skills", show: skills.length > 0 },
    { id: "education", label: "Education", show: education.length > 0 },
    { id: "contact", label: "Contact", show: mailHref !== undefined },
  ].filter((item) => item.show);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="shell bar">
          <a className="brand" href="#top">
            {name}
          </a>
          {nav.length > 0 && (
            <nav aria-label="Sections">
              <ul className="nav-list">
                {nav.map((item) => (
                  <li key={item.id}>
                    <a className="nav-link" href={`#${item.id}`}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero-wrap" aria-labelledby="hero-title">
          <div className="shell hero">
            <div className="hero-copy">
              <h1 id="hero-title" className="hero-name">
                {name}
              </h1>
              <p className="hero-role">{role}</p>
              {bio && <p className="hero-bio">{bio}</p>}
              {profileLinks.length > 0 && (
                <ul className="link-list">
                  {profileLinks.map(({ label, href }, index) => (
                    <li key={`${href}-${index}`}>
                      <Anchor href={href}>{label}</Anchor>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="head-panel" aria-label="Chain summary">
              <dl className="stats">
                <div className="stat">
                  <dt className="stat-key">head</dt>
                  <dd className="stat-value hash">
                    <ScrambleHash value={shortHash(head)} />
                  </dd>
                </div>
                <div className="stat">
                  <dt className="stat-key">blocks</dt>
                  <dd className="stat-value">{blocks.length}</dd>
                </div>
                {location && (
                  <div className="stat">
                    <dt className="stat-key">location</dt>
                    <dd className="stat-value">{location}</dd>
                  </div>
                )}
                {availability && (
                  <div className="stat">
                    <dt className="stat-key">status</dt>
                    <dd className="stat-value">
                      <span className="status-dot" aria-hidden="true" />
                      {availability}
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </section>

        {blocks.length > 0 && (
          <Section id="experience" title="Experience">
            <ol className="chain">
              {blocks.map(({ height, entry, prevHash, hash }) => {
                const companyHref = safeHref(entry.companyUrl);
                const when = [entry.period, entry.location].filter(Boolean).join(", ");
                return (
                  <li key={hash} className="block">
                    <div className="block-meta">
                      <span className="block-height">#{height}</span>
                      <span className="hash" title={hash}>
                        {shortHash(hash)}
                      </span>
                    </div>
                    <div className="block-rail" aria-hidden="true" />
                    <article className="block-body">
                      <h3 className="block-title">
                        {entry.role}
                        <span className="block-company">
                          {" at "}
                          {companyHref ? <Anchor href={companyHref}>{entry.company}</Anchor> : entry.company}
                        </span>
                      </h3>
                      {when && <p className="block-period">{when}</p>}
                      {entry.summary && <p className="row-text">{entry.summary}</p>}
                      {entry.highlights && entry.highlights.length > 0 && (
                        <ul className="block-points">
                          {entry.highlights.map((point, index) => (
                            <li key={`${point}-${index}`}>{point}</li>
                          ))}
                        </ul>
                      )}
                      {entry.stack && <Tags items={entry.stack} />}
                      <p className="block-parent">
                        parent{" "}
                        <span className="hash" title={prevHash}>
                          {shortHash(prevHash)}
                        </span>
                      </p>
                    </article>
                  </li>
                );
              })}
            </ol>
          </Section>
        )}

        {projects.length > 0 && (
          <Section id="projects" title="Projects">
            <ul className="rows">
              {projects.map((project, index) => {
                const demo = safeHref(project.href);
                const repo = safeHref(project.repo);
                return (
                  <li key={`${project.name}-${index}`} className="row">
                    <div className="row-key">
                      <h3 className="row-title">
                        {demo ? <Anchor href={demo}>{project.name}</Anchor> : project.name}
                      </h3>
                      {project.year && <p className="row-meta">{project.year}</p>}
                    </div>
                    <div className="row-value">
                      <p className="row-text">{project.description}</p>
                      {project.tags && <Tags items={project.tags} />}
                      {repo && (
                        <p className="row-links">
                          <Anchor href={repo}>Source code</Anchor>
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {skills.length > 0 && (
          <Section id="skills" title="Skills">
            <ul className="rows">
              {skills.map((group, index) => (
                <li key={`${group.label}-${index}`} className="row">
                  <div className="row-key">
                    <h3 className="row-title">{group.label}</h3>
                  </div>
                  <div className="row-value">
                    <Tags items={group.items} />
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {education.length > 0 && (
          <Section id="education" title="Education">
            <ul className="rows">
              {education.map((item, index) => (
                <li key={`${item.institution}-${index}`} className="row">
                  <div className="row-key">
                    <h3 className="row-title">{item.institution}</h3>
                    {item.period && <p className="row-meta">{item.period}</p>}
                  </div>
                  <div className="row-value">
                    <p className="row-text">{item.credential}</p>
                    {item.notes && <p className="row-meta">{item.notes}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {mailHref && email && (
          <Section id="contact" title="Contact">
            <a className="mail" href={mailHref}>
              {email}
            </a>
          </Section>
        )}
      </main>

      <footer className="site-footer">
        <div className="shell foot">
          <span>
            © {new Date().getFullYear()} {name}
          </span>
          <a className="text-link" href="#top">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
