import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Egg from '../egg';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  .name-lockup {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: clamp(10px, 2vw, 22px);
    font-size: clamp(40px, 8vw, 80px);

    svg {
      width: 0.85em;
      height: 0.85em;
      /* Calibre's visible letters sit above the centre of its line box. */
      transform: translateY(-0.12em) rotate(-12deg);

      @media (prefers-reduced-motion: no-preference) {
        &:hover {
          transform: translateY(-0.12em) rotate(0deg);
        }
      }
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>My name is</h1>;
  const two = (
    <div className="name-lockup">
      <h2 className="big-heading">Xiyuan Wang</h2>
      <Egg />
    </div>
  );
  const three = <h3 className="medium-heading">Human Computer Interaction | Data Visualization  </h3>;
  const four = (
    <>
      <p>
        <b>Hi there!</b>
      </p>

      <p>
        I'm a Ph.D. student at National University of Singapore at{' '}
        <a href="https://palettelab-nus.github.io/">Palette Lab</a>, supervised by{' '}
        <a href="https://ejane.me/">Prof. Jane L. E</a>. I completed my master's degree in Computer
        Science and Technology at{' '}
        <a href="https://www.ShanghaiTech.edu.cn/">ShanghaiTech</a> supervised by{' '}
        <a href="https://thinkavatar.github.io/">Prof. Quan Li</a> at{' '}
        <a href="https://viseerlab.cn/">Viseer Lab</a>, and I also obtained a B.S degree
        from the same university.
      </p>

      <p>
        My research interests lies in <b>supporting player-centered creativity</b> through
        human-computer interaction (HCI) methodologies.
      </p>

      <p>Simply reachout if you are interested!</p>
    </>
  );
  const five = (
    <a className="email-link" href="/resume.pdf" target="_blank" rel="noreferrer">
      Check out my resume!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
