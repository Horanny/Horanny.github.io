import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import Egg from '../egg';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .egg-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;

    &:before,
    &:after {
      content: '';
      width: 80px;
      height: 1px;
      background: var(--rose-border);
    }
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <div className="egg-divider" aria-hidden="true">
        <Egg variant="fried" />
      </div>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        My inbox is open in case you have any questions or just wanna say a hello!
      </p>

      <a className="email-link" href="mailto:wangxy7@ShanghaiTech.edu.cn">
        Mail Me!
      </a>
    </StyledContactSection>
  );
};

export default Contact;
