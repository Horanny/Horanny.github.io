import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
  h1 {
    margin: 0 0 7px 0px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '';
        top: 3px;
        width: 10px;
        height: 13px;
        border: 1px solid var(--rose-border);
        // border-radius: 50% 50% 45% 45% / 60% 60% 40% 40%;
        background: var(--navy);
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }

      &:after {
        content: '';
        position: absolute;
        top: 6.5px;
        left: 2px;
        width: 6px;
        height: 8px;
        border-radius: 50% 50% 42% 42% / 60% 60% 40% 40%;
        background: var(--yolk);
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .clip-definitions {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;

    .img {
      display: block;
      width: 100%;
      height: 100%;
      clip-path: url(#portrait-egg-clip);

      img {
        object-position: 8% 42%;
      }
    }

    .egg-outline {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      fill: none;
      stroke: var(--rose-border);
      stroke-width: 1.5px;
      pointer-events: none;
      transition: stroke 0.2s ease;
    }

    &:hover .egg-outline {
      stroke: var(--rose);
    }
  }
`;

// A high shoulder, a soft left lobe and an uneven base echo the fried-egg logo.
const portraitEggPath =
  'M52 5C67 2 82 9 88 21C97 37 88 51 85 64C82 78 76 93 62 95C49 98 44 84 31 81C16 78 5 72 6 59C7 46 20 40 28 31C35 24 32 10 52 5Z';

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['Data Analysis', 'Unity 3D', 'Cinema 4D', 'Figma', 'D3.js', 'Python'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I am a video game enthusiast, and I've always been dedicated to researching how design
              and technology can enhance players' gaming experience and enjoyment.
            </p>

            <p>
              My journey into the game domain started with a Bilibili game content creator,{' '}
              <a href="https://space.bilibili.com/374377?spm_id_from=333.337.0.0">
                <h1>泪腺战士</h1>
              </a>
              . Her deep empathy for game stories and profound gaming expertise immersed her
              audience into the game worlds she explored.
            </p>

            <p>
              Over the past few years, I’ve worked on several projects related to game data
              visualization and player experience enhancement, including
              <b> retain players</b>, <b>recommend more diverse friends</b>, and{' '}
              <b>assist game narrative interpretations</b>. I’m excited to continue exploring more player-centerd research in the future!
            </p>

            <p>My skills are not limited to this list!</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <svg className="clip-definitions" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id="portrait-egg-clip" clipPathUnits="objectBoundingBox">
                <path d={portraitEggPath} transform="scale(0.01)" />
              </clipPath>
            </defs>
          </svg>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/eggy_avatar.png"
              width={500}
              quality={100}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
            <svg className="egg-outline" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <path d={portraitEggPath} vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
