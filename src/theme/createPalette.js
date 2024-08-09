import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning, blues } from './colors';

export function createPalette(listTheme) {
  switch (listTheme) {
    case "style01":
    case "styleDark":
      return {
        action: {
          active: neutral[500],
          disabled: alpha(neutral[900], 0.38),
          disabledBackground: alpha(neutral[900], 0.12),
          focus: alpha(neutral[900], 0.16),
          hover: alpha(neutral[900], 0.04),
          selected: alpha(neutral[900], 0.12)
        },
        background: {
          default: common.black,
          paper: common.white
        },
        divider: '#d9dbde',
        error,
        info,
        mode: 'dark',
        neutral,
        primary: indigo,
        success,
        blues,
        text: {
          primary: neutral[900],
          secondary: neutral[500],
          disabled: alpha(neutral[900], 0.38)
        },
        warning
      };
    case "defaultStyle":
      return {
        action: {
          active: neutral[500],
          disabled: alpha(neutral[900], 0.38),
          disabledBackground: alpha(neutral[900], 0.12),
          focus: alpha(neutral[900], 0.16),
          hover: alpha(neutral[900], 0.04),
          selected: alpha(neutral[900], 0.12)
        },
        background: {
          default: common.white,
          paper: common.white
        },
        divider: '#F2F4F7',
        error,
        info,
        mode: 'light',
        neutral,
        primary: indigo,
        success,
        blues,
        text: {
          primary: neutral[900],
          secondary: neutral[500],
          disabled: alpha(neutral[900], 0.38)
        },
        warning
      };
    default:
      return {
        action: {
          active: neutral[500],
          disabled: alpha(neutral[900], 0.38),
          disabledBackground: alpha(neutral[900], 0.12),
          focus: alpha(neutral[900], 0.16),
          hover: alpha(neutral[900], 0.04),
          selected: alpha(neutral[900], 0.12)
        },
        background: {
          default: common.white,
          paper: common.white
        },
        divider: '#F2F4F7',
        error,
        info,
        mode: 'light',
        neutral,
        primary: indigo,
        success,
        blues,
        text: {
          primary: neutral[900],
          secondary: neutral[500],
          disabled: alpha(neutral[900], 0.38)
        },
        warning
      };
  }

}
