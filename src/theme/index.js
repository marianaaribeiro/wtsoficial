import { createTheme as createMuiTheme } from '@mui/material';

import { createShadows } from './createShadows';
import { createTypography } from './createTypography';
import { createPalette } from './createPalette';
import { createComponents } from './createComponents';


export function createTheme(listTheme) {

  const palette = createPalette(listTheme);
  const components = createComponents({ palette, listTheme });
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1440,
        xl: 1940
      }
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}
