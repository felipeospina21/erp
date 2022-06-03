import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-25px)',
};

export const theme = extendTheme({
  colors: {
    brand: {
      pink: '#ffbcb1',
      yellow: '#f1dd3d',
      teal: '#62a495',
      green: '#988c24',
      purple: '#a16586',
      bg: '#fff1e6',
      bgLight: '#ecf2fe',
    },
    custom: {
      grey: {
        50: '#ecf2fe',
        100: '#d3d8e1',
        200: '#b7bec7',
        300: '#9ca4af',
        400: '#818a98',
        500: '#67707e',
        600: '#505763',
        700: '#383e48',
        800: '#20252d',
        900: '#060c16',
      },
      blue: {
        50: '#d9f7ff',
        100: '#ade6ff',
        200: '#7fdafb',
        300: '#50d1f8',
        400: '#24cbf5',
        500: '#0ab9db',
        600: '#0085ab',
        700: '#00577c',
        800: '#00304c',
        900: '#00101c',
      },
      green: {
        50: '#e2fbf0',
        100: '#c2ebd8',
        200: '#9fddbd',
        300: '#7ccfa1',
        400: '#58c184',
        500: '#3ea771',
        600: '#2e825d',
        700: '#1f5d46',
        800: '#0f392c',
        900: '#00150d',
      },
      red: {
        50: '#ffe9e5',
        100: '#fbc0ba',
        200: '#f2948e',
        300: '#eb6661',
        400: '#e43535',
        500: '#ca271b',
        600: '#9e2413',
        700: '#711e0c',
        800: '#461505',
        900: '#1e0a00',
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'brand.teal',
          color: 'white',
        },
        primary_ghost: {
          bg: 'brand.teal',
          color: 'white',
          border: 'none',
        },
        accept: {
          bg: 'custom.green.500',
          color: 'white',
        },
        accept_light: {
          bg: 'custom.green.400',
          color: 'white',
        },
        accept_dark: {
          bg: 'custom.green.600',
          color: 'white',
        },
        reject: {
          bg: 'custom.red.400',
          color: 'white',
        },
        reject_light: {
          bg: 'custom.red.300',
          color: 'white',
        },
        reject_dark: {
          bg: 'custom.red.500',
          color: 'white',
        },

        accept_outline: {
          bg: 'transparent',
          color: 'custom.green.500',
          border: '1px solid',
          borderColor: 'custom.green.500',
        },
        accept_light_outline: {
          bg: 'transparent',
          color: 'custom.green.400',
          border: '1px solid',
          borderColor: 'custom.green.400',
        },
        accept_dark_outline: {
          bg: 'transparent',
          color: 'custom.green.600',
          border: '1px solid',
          borderColor: 'custom.green.600',
        },
        reject_outline: {
          bg: 'transparent',
          color: 'custom.red.400',
          border: '1px solid',
          borderColor: 'custom.red.400',
        },
        reject_light_outline: {
          bg: 'transparent',
          color: 'custom.red.300',
          border: '1px solid',
          borderColor: 'custom.red.300',
        },
        reject_dark_outline: {
          bg: 'transparent',
          color: 'custom.red.500',
          border: '1px solid',
          borderColor: 'custom.red.500',
        },
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            'input:focus + label,input.valid + label': {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'inherit',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
              borderRadius: '6px',
            },
          },
        },
      },
    },
  },
});

export default theme;
