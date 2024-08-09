import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927'
};

export const indigo = withAlphas({
  lightest: '#F5F7FF',
  light: '#EBEEFE',
  main: '#6366F1',
  dark: '#4338CA',
  darkest: '#312E81',
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#F0FDF9',
  light: '#3FC79A',
  main: '#10B981',
  dark: '#0B815A',
  darkest: '#134E48',
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#F79009',
  dark: '#B54708',
  darkest: '#7A2E0E',
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#F04438',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF'
});

export const blues = withAlphas({
  lightest: '#1305fb',
  light: '#0e04e5',
  main: '#0903d0',
  dark: '#0501ba',
  darkest: '#0000a4',
  contrastText: '#FFFFFF'
});
