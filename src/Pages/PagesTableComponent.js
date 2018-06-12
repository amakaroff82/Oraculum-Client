import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '../Shared/DataTable/DataTable';
import DataTableRowActions from '../Shared/DataTable/DataTableRowActions';
import { Button } from 'material-ui';

export const PagesTableComponent = ({   pages,
                                        table,
                                        updateTableSorting}) => {
    // Set up columns for ReactTable
    const columns = [
        {
            Header: 'Title',
            accessor: 'title',
            width: 400,
            Cell: props => <span title={props.value}>{props.value}</span>,
        },
        {
            Header: "URL",
            accessor: 'url',
            Cell: props => <span title={props.value}>{props.value}</span>,
            width: 400,
            //style: { textAlign: 'center' },
        },
        {
            Header: "Author",
            accessor: 'author.email',
            Cell: props => <span title={props.value}>{props.value}</span>,
            //width: 400,
            //style: { textAlign: 'center' },
        },
        {
            Header: "Actions",
            accessor: 'id',
            Cell: props => ActionsComponent(props),
            filterable: false,
            sortable: false,
        },
    ];

    const ActionsComponent = row => {
        /*const url = `${MC_PAGES_CANVAS_URL}${row.original.id}/${row.original
            .version}`;*/

        //console.log(row)
        const actions = [
            {
                childComponent: <Button
                  href={'#page/' + row.original._id}
                  color="primary"
                >View</Button>,
                text: 'view',
            },
        ];

        return <DataTableRowActions actions={actions}/>;
    };

    return (
        <DataTable
            data={pages.data}
            columns={columns}
            loading={pages.isLoading}
            sorting={table.sorting}
            onSortedChange={updateTableSorting}
            filterable={table.isFilterable}
        />
    );
};

PagesTableComponent.propTypes = {
    pages: PropTypes.object.isRequired,
    table: PropTypes.object.isRequired,
};

export default PagesTableComponent;
