import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {MuiThemeProvider} from 'material-ui/styles';
import {lightTheme} from './Shared/Themes';
import RootContainer from './Root/RootContainer';
import configureStore from './Root/RootStore/configureStore';
//import DummyConsole from './DummyConsole';
import 'typeface-nunito-sans';
import 'react-table/react-table.css';
//import {bootstrap} from './content';

/*if (!window.console || process.env.NODE_ENV === 'production') {
  DummyConsole();
}*/

/*if (document.location.host === 'localhost') {
  setTimeout(() => {
    bootstrap(true);
  }, 200);
}*/

const rootEl = document.getElementById('root');

render(
  <MuiThemeProvider theme={lightTheme}>
    <RootContainer store={configureStore}/>
  </MuiThemeProvider>,
  rootEl
);
