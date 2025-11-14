import { createTheme } from '@mui/material/styles';

const auroraNight = '#030704';
const auroraDeepSea = '#09253ABB';
const auroraViolet = '#392556';
const auroraTeal = '#23816D';
const auroraEmerald = '#219A70';
const auroraGlow = '#A8FFCE';
const auroraSolar = '#F1C550';
const auroraMist = '#C8F6FF';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: auroraEmerald,
      contrastText: auroraNight,
    },
    secondary: {
      main: auroraViolet,
      contrastText: auroraMist,
    },
    info: {
      main: auroraTeal,
      contrastText: '#F4FFFB',
    },
    warning: {
      main: auroraSolar,
      contrastText: auroraNight,
    },
    background: {
      default: auroraNight,
      paper: auroraDeepSea,
    },
    text: {
      primary: '#F4F9FF',
      secondary: 'rgba(200, 246, 255, 0.72)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});