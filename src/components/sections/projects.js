import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import Egg, { eggVariants } from '../egg';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
    text-align: center;
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    grid-gap: 24px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  &:hover .project-inner,
  &:focus-within .project-inner {
    background-color: #fff2c6;
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    min-height: 320px;
    padding: 28px;
    border-radius: var(--rounded-radius);
    background-color: var(--light-navy);
    transition: background-color 0.2s ease;
    overflow: hidden;

    > header,
    > footer {
      width: 100%;
    }
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    gap: 12px;
    margin-bottom: 22px;

    .project-category {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.4;

      svg {
        width: 34px;
        height: 34px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--rose);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        min-width: 44px;
        min-height: 44px;
        padding: 10px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }

      .link-placeholder {
        ${({ theme }) => theme.mixins.flexCenter};
        min-width: 44px;
        min-height: 44px;
        padding: 10px;
        color: var(--rose);

        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    line-height: 1.2;

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.45;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    flex-wrap: wrap;
    padding: 0;
    margin: 26px 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      padding: 3px 9px;
      border-radius: var(--rounded-radius);
      background: var(--navy);
      color: var(--light-slate);
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.projects.edges.filter(({ node }) => node?.frontmatter?.title);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = (node, index) => {
    const { frontmatter, html } = node;
    const { github, external, title, tech, company } = frontmatter;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="project-category">
              <Egg variant={eggVariants[(index + 2) % eggVariants.length]} />
              <span>{company === 'Case Comps' ? 'Case competition' : company || 'Project'}</span>
            </div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label={`${title} on GitHub`} target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label={`Explore ${title}`}
                  className="external"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
              {!external && !github && (
                <span className="link-placeholder" aria-label="Link forthcoming">
                  <Icon name="External" />
                </span>
              )}
            </div>
          </div>

          <h3 className="project-title">
            {external ? (
              <a href={external} target="_blank" rel="noreferrer">
                {title}
              </a>
            ) : (
              <span>{title}</span>
            )}
          </h3>

          {html ? (
            <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <p className="project-description">Project details forthcoming.</p>
          )}
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection id="projects">
      <h2 ref={revealTitle}>Selected Projects | Case Comps</h2>

      <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
        View Archive
      </Link>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node, i)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node, i)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      {projects.length > GRID_LIMIT && (
        <button className="more-button" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </StyledProjectsSection>
  );
};

export default Projects;
