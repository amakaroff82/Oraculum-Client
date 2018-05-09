import { createMuiTheme } from 'material-ui/styles';
import { theme, darkTheme } from 'material-ui-apollo';

export const appTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      focused: {
        color: theme.palette.primary[500],
      },
    },
    MuiInput: {
      inkbar: {
        '&:after': {
          backgroundColor: theme.palette.primary[500],
        },
      },
    },
  },
  menu: {
    active: {
      background: 'rgba(255, 255, 255, .27)',
    },
  },
  chart: {
    background: theme.palette.background.paper,
    line: {
      0: theme.palette.primary[500],
      1: '#F17800',
      2: '#7F3BA7',
      3: '#E2B627',
      4: '#43B649',
      5: '#DD4477',
      6: '#0099C6',
    },
    fill: {
      0: theme.palette.primary[500],
      1: theme.palette.primary[200],
    },
    bar: {
      0: theme.palette.primary[200],
      1: theme.palette.primary[800],
    },
  },
  darkChart: {
    background: darkTheme.palette.background.paper,
    line: {
      0: theme.palette.grey[50],
      1: '#F17800',
      2: '#7F3BA7',
      3: '#E2B627',
      4: '#43B649',
      5: '#DD4477',
      6: '#0099C6',
    },
    fill: {
      0: theme.palette.secondary['A400'],
      1: theme.palette.primary[200],
    },
    bar: {
      0: theme.palette.primary[200],
      1: theme.palette.secondary['A400'],
    },
  },
});
