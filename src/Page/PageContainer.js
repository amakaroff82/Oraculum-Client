import connect from '../Shared/connect';
import PageComponent from './PageComponent';
import { loadPage } from './actions';

const PageContainer = connect(
  ({ page }) => ({ page }),
  {loadPage}
)(PageComponent);

export default PageContainer;
