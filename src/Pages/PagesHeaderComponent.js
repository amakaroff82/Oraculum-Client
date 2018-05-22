import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'material-ui';
import ReloadIcon from 'material-ui-apollo-icons/Reload';
import FilterIcon from 'material-ui-apollo-icons/Filter';
import TableHeader from '../Shared/DataTable/TableHeader';

const renderLeftButtons = (toggleCreateModal, disabled) => {
    return [
        /*<Button
            className={'PagesHeaderComponent-new-page-button'}
            raised
            color="primary"
            key="toolbar_new"
            onClick={toggleCreateModal}
            disabled={true}
        >
            Add New Page
        </Button>,*/
    ];
};

const renderRightButtons = (toggleFilterable, loadPages) => [
    /*<IconButton key="toolbar_filter" onClick={toggleFilterable}>
        <FilterIcon />
    </IconButton>,*/
    <IconButton key="toolbar_refresh" onClick={loadPages}>
        <ReloadIcon />
    </IconButton>,
];

export const PagesHeader = ({

                                   loadPages,
                                   toggleCreateModal,
                                   toggleFilterable,
                                   intl,
                                   pagesHeaderLabel
                               }) => {
    return (
        <TableHeader
            headerLabel={pagesHeaderLabel}
            leftButtons={renderLeftButtons(toggleCreateModal, false)}
            rightButtons={renderRightButtons(toggleFilterable, loadPages)}
        />
    );
};

PagesHeader.propTypes = {
    loadPages: PropTypes.func.isRequired,
    toggleCreateModal: PropTypes.func.isRequired,
    toggleFilterable: PropTypes.func.isRequired,
    pagesHeaderLabel: PropTypes.string.isRequired,
};

export default PagesHeader;
