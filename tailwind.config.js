module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif !important'],
    },

    extend: {
      fontSize: {
        '2xs': '.65rem',
      },
      colors: {
        indigo: {
          100: '#ccdddf',
          200: '#99bbbe',
          300: '#669a9e',
          400: '#33787d',
          500: '#00565d',
          600: '#00454a',
          700: '#003438',
          800: '#002225',
          900: '#001113',
        },
        cream: {
          100: '#f1ebe1',
          200: '#e3d7c3',
          300: '#d6c2a6',
          400: '#c8ae88',
          500: '#ba9a6a',
          600: '#957b55',
          700: '#705c40',
          800: '#4a3e2a',
          900: '#251f15',
        },

        pink: {
          100: '#f8eee7',
          200: '#f2ddcf',
          300: '#ebcdb7',
          400: '#e5bc9f',
          500: '#deab87',
          600: '#b2896c',
          700: '#856751',
          800: '#594436',
          900: '#2c221b',
        },
        gray: {
          100: '#dddcdc',
          200: '#bab9b9',
          300: '#989795',
          400: '#757472',
          500: '#53514f',
          600: '#42413f',
          700: '#32312f',
          800: '#212020',
          900: '#111010',
        },
        orange: {
          100: '#ffe1cc',
          200: '#ffc299',
          300: '#ffa466',
          400: '#ff8533',
          500: '#ff6700',
          600: '#cc5200',
          700: '#993e00',
          800: '#662900',
          900: '#331500',
        },
        yellow: {
          100: '#fff7cc',
          200: '#ffee99',
          300: '#ffe666',
          400: '#ffdd33',
          500: '#ffd500',
          600: '#ccaa00',
          700: '#998000',
          800: '#665500',
          900: '#332b00',
        },
        red: {
          100: '#ffddd3',
          200: '#ffbba7',
          300: '#ff987b',
          400: '#ff764f',
          500: '#ff5423',
          600: '#cc431c',
          700: '#993215',
          800: '#66220e',
          900: '#331107',
        },
      },
      zIndex: {
        1: 1,
        '-1': '-1',
      },
      transformOrigin: {
        0: '0%',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out',
      },
    },
  },
  variants: {
    extend: {},
  },
}
