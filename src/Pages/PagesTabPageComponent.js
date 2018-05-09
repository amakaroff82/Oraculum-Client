import React from 'react';
import lifecycle from 'recompose/lifecycle';

import Layout from '../Shared/Layout';
import Paper from 'material-ui/Paper';
//import CreateJourneyModalContainer from './CreateJourneyModalContainer';
//import EditJourneyModalContainer from './EditJourneyModalContainer';
import PagesHeaderContainer from './PagesHeaderContainer';
import PagesTableContainer from './PagesTableContainer';

export const PagesTabPageComponent = () => {
    return (
        <Layout>
            <Paper>
                <PagesHeaderContainer />
                <PagesTableContainer />
            </Paper>
        </Layout>
    );
};

export default lifecycle({
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.loadPages();
    },
})(PagesTabPageComponent);
