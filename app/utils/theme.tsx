import {
  DefaultTheme,
  DarkTheme,
  useTheme,
  Theme,
} from '@react-navigation/native';

export function useDerbyTheme(): DerbyTheme {
  // @ts-ignore
  return useTheme();
}

interface DerbyTheme extends Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    backgroundCard: string;
    backgroundCardNoOpacity: string;
    backgroundScreen: string;
    backgroundSuccess: string;
    backgroundError: string;
    textMuted: string;
    textMuted1: string;
    success: string;
    success1: string;
    error: string;
    error1: string;
    warning: string;
    white: string;
    joy1: string;
    joy2: string;
    joy3: string;
    joy33: string;
    joy4: string;
  };
  sizes: {
    BASE: number;
    FONT: number;
  };
}

const lightTheme: DerbyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundCard: '#ffffff',
    backgroundCardNoOpacity: '#ffffff',
    textMuted: 'rgb(174,179,181)',
    textMuted1: 'rgb(221,219,219)',
    backgroundScreen: '#F3F4F6',
    backgroundSuccess: 'rgb(220,245,214)',
    backgroundError: 'rgba(244,230,224, 1)',
    success: '#2bc32f',
    error: '#de0d56',
    success1: '#46e74a',
    error1: '#f1062c',
    warning: '#fc6922',
    white: '#fff',
    joy1: 'rgb(43,112,149)',
    joy2: 'rgb(63,176,188)',
    joy3: '#c4c4c4',
    joy33: 'rgb(79,159,190)',
    joy4: '#478d60',
    primary: 'rgb(10, 132, 255)',
  },
  sizes: {
    BASE: 16,
    FONT: 16,
  },
};

const darkTheme: DerbyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#999',
    backgroundCard: 'rgba(60,60,60,0.8)',
    backgroundCardNoOpacity: 'rgb(205,205,205)',
    textMuted: '#d7d7d7',
    textMuted1: '#cbcbcb',
    backgroundScreen: 'rgba(16,16,17,0)',
    backgroundSuccess: 'rgba(66,79,66, 1)',
    backgroundError: 'rgba(109,91,79, 1)',
    success: '#2bc32f',
    error: '#cd4040',
    success1: '#46e74a',
    error1: '#f1062c',
    warning: '#ffb700',
    white: '#fff',
    joy1: 'rgb(43,112,149)',
    joy2: 'rgb(43,149,137)',
    joy3: '#c4c4c4',
    joy33: 'rgb(79,159,190)',
    joy4: '#478d60',
    primary: 'rgb(8,164,208)',
  },
  sizes: {
    BASE: 16,
    FONT: 16,
  },
};

export default [lightTheme, darkTheme];
