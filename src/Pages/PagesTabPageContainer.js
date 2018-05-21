import connect from '../Shared/connect';
import PagesTabPageComponent from './PagesTabPageComponent';
import { loadPages, loadAllPages } from './actions';

// Connects to the store and injects select state and action creators into component props
const PagesTabPageContainer = connect(
  null,
  /*
    If an object is passed, each function inside it is assumed to be a Redux action creator.
    An object with the same function names, but with every action creator wrapped into a
    dispatch call so they may be invoked directly, will be merged into the component’s props.
    - https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments
    */
  { loadPages :  loadPages }
)(PagesTabPageComponent);

// Connects to the store and injects select state and action creators into component props
export const AllPagesTabPageContainer = connect(
  null,
  /*
    If an object is passed, each function inside it is assumed to be a Redux action creator.
    An object with the same function names, but with every action creator wrapped into a
    dispatch call so they may be invoked directly, will be merged into the component’s props.
    - https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments
    */
  { loadPages :  loadAllPages }
)(PagesTabPageComponent);



export default PagesTabPageContainer;
