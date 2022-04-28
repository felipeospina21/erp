import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand:{
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
    }
  },
  shadow:{
    light: '0px 8px 16px rgba(143, 149, 178, 0.15)'
  }
});

export default theme;
