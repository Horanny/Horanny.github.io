import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import Egg, { eggVariants } from '../egg';

const StyledFeaturedSection = styled.section`
  max-width: 1400px;

  .publications-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin: -12px 0 28px;
  }

  .publication-count {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }

  .view-switch {
    display: inline-flex;
    flex-shrink: 0;
    gap: 16px;
    padding: 0;
    background: transparent;

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      min-height: 36px;
      position: relative;
      padding: 8px 0;
      border-radius: 0;
      background: transparent;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        color: var(--lightest-slate);
        background: var(--navy);
      }

      &[aria-pressed='true'] {
        color: var(--rose);

        &:after {
          content: '';
          position: absolute;
          right: 0;
          bottom: 1px;
          left: 0;
          height: 2px;
          border-radius: 2px;
          background: var(--yolk);
        }

        svg {
          color: var(--green);
        }
      }

      svg {
        width: 15px;
        height: 15px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5;
      }
    }
  }

  @media (max-width: 480px) {
    .publication-count {
      font-size: var(--fz-xxs);
    }

    .view-switch button {
      min-height: 40px;
      padding: 8px 0;
    }
  }
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(28px, 4vw, 60px);
  align-items: center;
  padding: 32px 0;

  &:not(:last-of-type) {
    margin-bottom: 48px;
  }

  .project-content {
    min-width: 0;
    grid-column: 2;
    grid-row: 1;
    text-align: left;
  }

  .research-marker {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    line-height: 1.5;

    svg {
      width: 34px;
      height: 34px;
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.45;
    overflow-wrap: anywhere;

    p {
      margin: 0 0 16px;

      &:first-child {
        color: var(--lightest-slate);
        font-size: clamp(23px, 2.2vw, 29px);
        line-height: 1.18;

        em {
          font-style: normal;
        }
      }

      &:last-child {
        margin-bottom: 0;
        color: var(--rose);
        font-family: var(--font-mono);
        font-size: var(--fz-sm);
        line-height: 1.8;

        strong {
          color: inherit;
        }
      }
    }

    strong {
      color: var(--lightest-slate);
      font-weight: 600;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    transform: translateX(-2px);
    gap: 6px 10px;
    margin: 18px 0 0;
    padding: 0;
    list-style: none;

    li {
      padding: 4px 9px;
      border-radius: var(--rounded-radius);
      background: var(--light-navy);
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.5;
    }
  }

  .project-links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    margin-top: 12px;
    color: var(--lightest-slate);

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      min-height: 44px;
      padding: 8px 0;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .link-placeholder {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .project-image {
    position: relative;
    grid-column: 1;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    a {
      display: block;
      width: 100%;
    }

    .img {
      display: block;
      width: 100%;
      border-radius: 5px;
      filter: none;
    }
  }

  .project-image-placeholder {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 26px;
    padding: 20px 0;

    .project-content {
      grid-column: 1;
      grid-row: 2;
    }

    .project-image {
      max-width: 520px;
      justify-self: center;
    }
  }

  ${({ $compact }) =>
    $compact &&
    css`
      display: grid;
      grid-template-columns: 160px minmax(0, 1fr);
      gap: 24px;
      align-items: center;
      min-height: 0;
      padding: 24px 0;
      border-bottom: 1px solid var(--list-divider);

      &:first-child {
        border-top: 1px solid var(--list-divider);
      }

      &&:not(:last-of-type) {
        margin-bottom: 0;
      }

      && .project-content {
        grid-column: 2;
        grid-row: 1;
        margin: 0;
        text-align: left;

        > div {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start;
          gap: 20px;
        }
      }

      .project-description {
        padding: 0;
        background: transparent;
        border: 0;
        box-shadow: none;
        font-size: var(--fz-lg);
        line-height: 1.4;
        overflow-wrap: anywhere;

        p {
          margin: 0 0 6px;

          &:first-child {
            margin-bottom: 8px;
            font-size: var(--fz-xxl);
            line-height: 1.25;

            em {
              font-style: normal;
            }
          }

          &:last-child {
            margin-bottom: 0;
            color: var(--rose);
            font-family: var(--font-mono);
            font-size: var(--fz-xs);
            line-height: 1.6;

            strong {
              color: inherit;
            }
          }
        }
      }

      &:hover .project-description p:first-child,
      &:focus-within .project-description p:first-child {
        color: var(--rose);
      }

      && .project-links {
        color: var(--rose);
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: -6px -10px 0 0;

        a {
          min-width: 44px;
          min-height: 44px;
        }
      }

      .research-marker,
      .link-label,
      .project-tech-list {
        display: none;
      }

      && .project-image {
        grid-column: 1;
        grid-row: 1;
        width: 160px;
        height: 110px;

        a {
          height: 100%;
        }

        .img {
          height: 100%;
        }

        img {
          object-fit: contain !important;
        }
      }

      @media (max-width: 600px) {
        grid-template-columns: 90px minmax(0, 1fr);
        gap: 14px;
        padding: 20px 0;

        && .project-image {
          width: 90px;
          height: 70px;
        }

        && .project-content > div {
          grid-template-columns: minmax(0, 1fr);
          gap: 8px;
        }

        .project-description {
          font-size: var(--fz-md);

          p:first-child {
            font-size: var(--fz-xl);
          }
        }

        && .project-links {
          margin: 0 0 -8px -10px;
        }
      }
    `}
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
              cta
            }
            html
          }
        }
      }
    }
  `);

  const [view, setView] = useState('list');
  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledFeaturedSection id="publications">
      <h2 className="numbered-heading" ref={revealTitle}>
        Publications
      </h2>

      <div className="publications-toolbar">
        <span className="publication-count">{featuredProjects.length} publications</span>
        <div className="view-switch" role="group" aria-label="Publication view">
          <button
            type="button"
            aria-pressed={view === 'list'}
            aria-controls="publication-items"
            onClick={() => setView('list')}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M1 3h2m3 0h9M1 8h2m3 0h9M1 13h2m3 0h9" />
            </svg>
            List
          </button>
          <button
            type="button"
            aria-pressed={view === 'detailed'}
            aria-controls="publication-items"
            onClick={() => setView('detailed')}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="1" y="2" width="5" height="12" rx="1" />
              <path d="M9 3h6M9 7h6M9 11h4" />
            </svg>
            Detailed
          </button>
        </div>
      </div>

      <StyledProjectsGrid id="publication-items">
        {featuredProjects.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { external, title, tech, github, cover, cta } = frontmatter;
          const image = getImage(cover);
          const projectUrl = external || github;

          return (
            <StyledProject
              key={title}
              $compact={view === 'list'}
              ref={el => (revealProjects.current[i] = el)}>
              <div className="project-content">
                <div>
                  <div className="research-marker">
                    <Egg variant={eggVariants[i % eggVariants.length]} />
                    <span>
                      {String(i + 1).padStart(2, '0')} / {title}
                    </span>
                  </div>
                  <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />

                  {tech?.length > 0 && (
                    <ul className="project-tech-list">
                      {tech.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="project-links">
                    {cta && (
                      <a href={cta} aria-label={`View more about ${title}`} className="cta">
                        View More
                      </a>
                    )}
                    {github && (
                      <a
                        href={github}
                        aria-label={`${title} on GitHub`}
                        target="_blank"
                        rel="noreferrer">
                        <span className="link-label">Code</span>
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {external && !cta && (
                      <a
                        href={external}
                        aria-label={`Open ${title}`}
                        className="external"
                        target="_blank"
                        rel="noreferrer">
                        <span className="link-label">Explore research</span>
                        <Icon name="External" />
                      </a>
                    )}
                    {!projectUrl && !cta && (
                      <span className="link-placeholder" aria-label="Link forthcoming">
                        <Icon name="External" />
                        <span>Link forthcoming</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {image ? (
                <div className="project-image">
                  {projectUrl ? (
                    <a href={projectUrl} target="_blank" rel="noreferrer">
                      <GatsbyImage image={image} alt={`${title} project preview`} className="img" />
                    </a>
                  ) : (
                    <GatsbyImage image={image} alt={`${title} project preview`} className="img" />
                  )}
                </div>
              ) : (
                <div className="project-image project-image-placeholder">
                  <span>{title} image placeholder</span>
                </div>
              )}
            </StyledProject>
          );
        })}
      </StyledProjectsGrid>
    </StyledFeaturedSection>
  );
};

export default Featured;
