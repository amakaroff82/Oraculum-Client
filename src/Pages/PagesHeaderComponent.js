import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'material-ui';
import ReloadIcon from 'material-ui-apollo-icons/Reload';
import FilterIcon from 'material-ui-apollo-icons/Filter';
import TableHeader from '../Shared/DataTable/TableHeader';
import TagsInputComponent from '../Shared/TagsInputComponent';

const renderLeftButtons = (tags) => {
    return [
        <TagsInputComponent
          tags={tags}
        ></TagsInputComponent>
    ];
};

const renderRightButtons = (toggleFilterable, loadPages) => [
    <IconButton key="toolbar_filter" onClick={toggleFilterable}>
        <FilterIcon />
    </IconButton>,
    <IconButton key="toolbar_refresh" onClick={loadPages}>
        <ReloadIcon />
    </IconButton>,
];

export const PagesHeader = ({
                              loadPages,
                              toggleFilterable,
                              intl,
                              pagesHeaderLabel,
                              tags
                            }) => {
    return (
        <TableHeader
            headerLabel={pagesHeaderLabel}
            leftButtons={renderLeftButtons(tags.data)}
            rightButtons={renderRightButtons(toggleFilterable, loadPages)}
        />
    );
};

PagesHeader.propTypes = {
    loadPages: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired,
    toggleFilterable: PropTypes.func.isRequired,
    pagesHeaderLabel: PropTypes.string.isRequired,
};

export default PagesHeader;
