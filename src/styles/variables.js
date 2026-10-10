import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #ffe571;
    --navy: #fffcee;
    --light-navy: #fff7d6;
    --lightest-navy: #feefad;
    --rose: rgb(237, 110, 164);
    --heading-line: rgb(233, 116, 165);
    --list-divider: rgba(136, 146, 176, 0.4);
    --paper: #fffefa;
    --rose-tint: #fdeef4;
    --rose-border: #f4c4d9;
    --yolk: #f3c65d;
    --surface-border: #e9dcc4;
    // --dark-slate: #68D2E8;
    // --slate: #03AED2;
    // --light-slate: #0390AE;
    // --lightest-slate: #036C83;
    --dark-slate: #ccd6f6;
    --slate: #8892b0;
    --light-slate: #6d789b;
    --lightest-slate: #495670;
    --white: #e6f1ff;
    --green: var(--rose);
    --green-tint: var(--rose-tint);
    --pink: #f57dff;
    --blue: #57cbff;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --rounded-radius: 22px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
