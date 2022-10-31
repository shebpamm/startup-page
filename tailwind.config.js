//const plugin = require("tailwindcss/plugin");
//const colors = require("tailwindcss/colors");tailwin

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-themer')({
      defaultTheme: {
        // put the default values of any config you want themed
        // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
        extend: {
          // colors is used here for demonstration purposes
          colors: {
            'light': '#f0ebd8',
            'pale': '#f4ece2',
            'dim': '#222222', //dark color
            'accent1': '#a2a182',
            'accent2': '#687259',
            'accent3': '#ba6f4d', //Date light, search focus
            'accent4': '#8e412e' // Date dark, search focus
          }
        }
      },
      themes: [
        {
          name: 'theme-pastel',
          extend: {
            colors: {
              'light': '#DBF5FF',
              'pale': '#DBF5FF',
              'dim': '#f8c1b8',
              'accent1': '#CBB4E2',
              'accent2': '#CBB4E2',
              'accent3': '#f8aab6',
              'accent4': '#f8aab6',
              'readable': '#a25454',
              'moon': '#4f4c48'
            }
          }
        },
        {
          name: 'theme-nord',
          extend: {
            colors: {
              'light': '#eceff4',
              'pale': '#e5e9f0',
              'dim': '#1d2d44',
              'accent1': '#a2a182',
              'accent2': '#A3BE8C',
              'accent3': '#D08770',
              'accent4': '#BF616A',
            }
          }
        },
        {
          name: 'theme-shine',
          extend: {
            colors: {
              'light': '#efefef', //light color
              'pale': '#dddddd', //sun icon, dark border
              'dim': '#222222', //dark color
              'accent1': '#434343',
              'accent2': '#343434',
              'accent3': '#909090',
              'accent4': '#707070'
            }
          }
        },
      ]
    })
  ],
  content: [
    "./public/**/*.html",
    "./public/*.html",
    "./src/**/*.jsx",
    "./src/*.jsx",
    "./src/**/*.html",
    "./src/*.html",
    "./public/**/*.js",
    "./public/*.js",
  ],
  safelist: [
    {
      pattern: /text-.*/,
      variants: [
        "theme-pastel"
      ],
    },
    {
      pattern: /bg-moon/,
      variants: [
        "theme-pastel"
      ],
    },
  ],
  variants: {
    opacity: ({ after }) => after(['disabled']),
  },
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        '4xl': 'rgb(38, 57, 77) 0px 20px 30px -10px',
        'inner-md': 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;',
        'inner-lg': 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
        'inner-xl': 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
        'inner-2xl': 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
      },
      minHeight: {
        "screen-75": "75vh",
      },
      backgroundImage: {
        'google-icon': "url('/src/assets/img/google.svg')",
        'duck-icon': "url('/src/assets/img/duck.svg')",
        'wolfram-icon': "url('/src/assets/img/wolfram.svg')",
        'stack-icon': "url('/src/assets/img/stack.svg')",
        'sun-icon': "url('/src/assets/img/sun.svg')",
        'sun-cloud-icon': "url('/src/assets/img/sun-cloud.svg')",
        'wind-icon': "url('/src/assets/img/wind.svg')",
        'humidity-icon': "url('/src/assets/img/humidity.svg')",
      },
    },
  },
};
