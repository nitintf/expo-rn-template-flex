/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2362AB',
        },
        
        secondary: {
          main: '#1E2C37',
        },
        
        text: {
          primary: '#FFFFFF',
          secondary: '#2F81E1',
        },
        
        background: {
          default: '#0F1115',
          paper: '#1A1B23',
        },
        
        divider: 'rgba(255,255,255,0.1)',
        
        grey: {
          50: '#8996A9',
          100: '#2C2D38',
          900: '#000000',
        },
        
        'primary-green': {
          main: '#419550',
          100: '#0CD14B',
          200: '#56C869',
          300: '#41954F',
          400: '#2AD145',
          500: '#4BFF68',
        },
        
        'custom-grey': {
          A100: '#E1E1E1',
          50: '#E5F0FA',
          100: '#CFCFCF',
          200: '#B8B8B8',
          300: '#656E79',
          400: '#333',
          500: '#E5E5E5',
          600: '#ECECEC',
          700: '#F6F6F6',
          800: '#C0C0C026',
          900: '#E3E3E3',
        },
        
        'dark-blue': {
          main: '#13212D',
          100: '#141920',
          200: '#0F1418',
          500: '#101a21',
          600: '#23242E',
          700: '#002a5b',
          800: '#191C22',
          900: '#000a16',
        },
        
        'blue-neutral': {
          main: '#364C5D',
          200: '#2A74CA',
          300: '#2362AB',
          400: '#364C5D80',
          500: '#2B3E4D80',
          600: '#42596B',
          700: '#344553',
          800: '#495D6D',
        },
        
        yellow: {
          main: '#FFD700',
          100: '#FEA803',
          200: '#E2C139',
          800: '#CD7F32',
          900: '#AF7236',
        },
        
        red: {
          main: '#EF1414',
          100: '#D97366',
        },
      },
      
      fontFamily: {
        primary: ['"Karla Variable"', '"Space Grotesk Variable"', 'sans-serif'],
        secondary: ['"Space Grotesk Variable"', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
