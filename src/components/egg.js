import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledEgg = styled.svg`
  display: inline-block;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  overflow: visible;

  .egg-white {
    fill: var(--navy);
    stroke: var(--rose);
    stroke-width: 1.4;
  }

  .egg-line {
    fill: none;
    stroke: var(--rose);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .egg-bowl {
    fill: var(--rose-tint);
    stroke: var(--rose);
    stroke-width: 1.4;
  }

  .egg-yolk {
    fill: var(--yolk);
  }

  .egg-shine {
    fill: none;
    stroke: var(--navy);
    stroke-width: 2.5;
    stroke-linecap: round;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.25s ease;
    &:hover {
      transform: rotate(12deg);
    }
  }
`;

export const eggVariants = ['fried', 'sunny', 'soft', 'onsen', 'poached', 'crispy'];

const Egg = ({ variant = 'fried' }) => (
  <StyledEgg viewBox="0 0 80 80" aria-hidden="true" focusable="false">
    {variant === 'sunny' ? (
      <>
        <path
          className="egg-white"
          d="M18 20C26 11 34 18 42 13C52 7 66 15 64 27C62 34 75 39 70 51C65 63 55 59 47 67C38 75 30 63 21 64C8 65 5 52 11 43C17 35 10 28 18 20Z"
        />
        <circle className="egg-yolk" cx="42" cy="40" r="16" />
        <path className="egg-shine" d="M34 38C34 34 37 31 41 31" />
      </>
    ) : variant === 'soft' ? (
      <>
        <path
          className="egg-white"
          d="M40 10C54 10 64 34 64 48C64 64 54 72 40 72C26 72 16 64 16 48C16 34 26 10 40 10Z"
        />
        <path
          className="egg-yolk"
          d="M40 32C51 32 56 40 54 50C52 58 45 58 42 63C39 67 35 63 34 59C26 56 24 48 27 41C29 35 34 32 40 32Z"
        />
        <path className="egg-shine" d="M32 43C33 39 36 37 40 37" />
      </>
    ) : variant === 'onsen' ? (
      <>
        <ellipse className="egg-bowl" cx="37" cy="43" rx="32" ry="29" />
        <ellipse fill="var(--lightest-navy)" cx="37" cy="43" rx="27" ry="24" />
        <path
          fill="var(--paper)"
          stroke="var(--surface-border)"
          strokeWidth="1"
          d="M18 37C20 28 29 27 33 34C36 39 33 43 37 49C40 57 31 64 23 59C16 55 14 45 18 37Z"
        />
        <path
          fill="var(--paper)"
          stroke="var(--surface-border)"
          strokeWidth="1"
          d="M37 27C42 22 55 26 58 34C62 42 56 47 48 45C42 44 34 37 37 27Z"
        />
        <g transform="rotate(43 46 51)">
          <rect
            x="44.5"
            y="9"
            width="3"
            height="39"
            rx="1.5"
            fill="var(--navy)"
            stroke="var(--rose-border)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="46"
            cy="52"
            rx="6"
            ry="8"
            fill="var(--navy)"
            stroke="var(--rose-border)"
            strokeWidth="1.4"
          />
          <path
            d="M43 52Q43 48 46 47"
            fill="none"
            stroke="var(--rose-border)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
        <path className="egg-line" opacity="0.6" d="M23 10Q19 7 23 3M36 9Q32 6 36 2" />
      </>
    ) : variant === 'poached' ? (
      <>
        <ellipse className="egg-bowl" cx="40" cy="53" rx="29" ry="8" />
        <ellipse fill="var(--navy)" cx="40" cy="52" rx="24" ry="5" />
        <path
          className="egg-white"
          d="M22 46C23 39 24 29 34 26C45 22 54 30 55 38C57 43 61 49 55 52C44 58 25 55 22 46Z"
        />
        <path
          className="egg-yolk"
          d="M40 32C49 31 54 38 50 44C46 48 48 50 51 53C45 57 37 54 37 49C26 47 28 34 40 32Z"
        />
        <path className="egg-shine" d="M34 39Q35 35 40 35" />
      </>
    ) : variant === 'crispy' ? (
      <>
        <path
          fill="#F3C15A"
          stroke="#CD963F"
          strokeWidth="1.4"
          strokeLinejoin="round"
          d="M12 30Q9 22 18 22Q17 14 26 17Q30 9 36 15Q44 7 49 15Q58 11 60 20Q69 18 68 27Q77 30 71 38Q76 45 69 50Q72 59 61 59Q59 68 50 64Q43 71 36 65Q27 70 23 62Q14 65 13 56Q5 54 10 45Q3 38 12 30Z"
        />
        <g
          fill="none"
          stroke="#D89A32"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M18 31Q27 21 32 27T45 25Q49 19 57 25M14 43Q21 35 27 42T42 38Q50 29 62 35" />
          <path d="M21 53Q26 47 34 51T48 48Q57 42 65 46M34 60Q40 54 47 58T59 55" />
        </g>
        <g fill="none" stroke="#FFE298" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21 28L26 25M37 22L42 21M54 30L59 32M16 39L20 37M31 35L36 33M24 48L29 49M45 44L49 40M52 59L56 57" />
        </g>
      </>
    ) : (
      <>
        <path
          className="egg-white"
          d="M42 7C55 5 62 15 62 25C62 33 74 35 72 47C70 59 61 57 56 65C49 76 38 70 30 69C17 68 7 63 8 51C9 42 17 39 19 30C21 17 29 9 42 7Z"
        />
        <ellipse className="egg-yolk" cx="40" cy="42" rx="15" ry="16" />
        <path className="egg-shine" d="M32 39C32 35 35 32 39 32" />
      </>
    )}
  </StyledEgg>
);

Egg.propTypes = {
  variant: PropTypes.oneOf(eggVariants),
};

export default Egg;
