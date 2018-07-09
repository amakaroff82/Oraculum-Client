import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'material-ui';
import ReloadIcon from 'material-ui-apollo-icons/Reload';
import FilterIcon from 'material-ui-apollo-icons/Filter';
import TableHeader from '../Shared/DataTable/TableHeader';
import TagsInputComponent from '../Shared/TagsInputComponent';

const renderLeftButtons = (tags, onTagsChange) => {
    return [
        <TagsInputComponent
          tags={tags}
          onChange={onTagsChange}
        ></TagsInputComponent>
    ];
};

const renderRightButtons = (toggleFilterable, onRefresh) => [
    <IconButton key="toolbar_filter" onClick={toggleFilterable}>
        <FilterIcon />
    </IconButton>,
    <IconButton key="toolbar_refresh" onClick={onRefresh}>
        <ReloadIcon />
    </IconButton>,
];

export const PagesHeader = ({
                              loadPages,
                              toggleFilterable,
                              intl,
                              pagesHeaderLabel,
                              tags,
                              onTagsChange,
                              auth
                            }) => {

    let onRefresh = () => {
      loadPages(auth.user._id);
    };

    return (
        <TableHeader
            headerLabel={pagesHeaderLabel}
            leftButtons={renderLeftButtons(tags.data, onTagsChange)}
            rightButtons={renderRightButtons(toggleFilterable, onRefresh)}
        />
    );
};

PagesHeader.propTypes = {
    loadPages: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired,
    toggleFilterable: PropTypes.func.isRequired,
    onTagsChange: PropTypes.func.isRequired,
    pagesHeaderLabel: PropTypes.string.isRequired,
};

export default PagesHeader;
