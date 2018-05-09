import { mergeDeepLeft } from 'ramda';
import { darkTheme as apolloDarkTheme } from 'material-ui-apollo';
import { appTheme } from './appTheme';

const darkTheme = mergeDeepLeft(apolloDarkTheme, appTheme); //local theme overrides take precedence

export default darkTheme;
