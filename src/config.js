module.exports = {
  email: 'wangxy7@shanghaitech.edu.cn',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/Horanny',
    },
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.com/citations?hl=en&user=AY4fZtIAAAAJ&view_op=list_works&gmla=ALUCkoXvOP54AXZgXZJnAYonTH1oNBz9Ux7WSwKidJr_9PBLKsP_oE_U0mr5yO9zUk5f6xfhA_yaLKLrqP46iThEhPL4sKN1a-XH2QoFSARk3Hlv86NjgwIBRyk6CnGc6S5eQey4yq6L',
    },
    // {
    //   name: 'Twitter',
    //   url: 'https://twitter.com/chandrikadeb7',
    // },
    // {
    //   name: 'Linkedin',
    //   url: 'https://www.linkedin.com/in/chandrika-deb',
    // },
    // {
    //   name: 'Codepen',
    //   url: 'https://codepen.io/chandrikadeb7',
    // },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Background',
      url: '/#background',
    },
    {
      name: 'Publications',
      url: '/#publications',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  // colors: {
  //   green: '#64ffda',
  //   navy: '#0a192f',
  //   darkNavy: '#020c1b',
  // },

  colors: {
    green: '#64ffda',
    navy: '#FEEFAD',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
