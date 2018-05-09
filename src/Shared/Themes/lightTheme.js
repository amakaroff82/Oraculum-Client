import { mergeDeepLeft } from 'ramda';
import { theme as apolloLightTheme } from 'material-ui-apollo';
import { appTheme } from './appTheme';

const lightTheme = mergeDeepLeft(apolloLightTheme, appTheme); //local theme overrides take precedence

export default lightTheme;
