import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SHORT_DATETIME_FORMAT } from '../Shared/Formats';
import DataTable from '../Shared/DataTable/DataTable';
import DataTableRowActions from '../Shared/DataTable/DataTableRowActions';
import {toggleEditModal, updateTableSorting} from "./actions";
//import { MC_PAGES_CANVAS_URL,  } from './Helpers/constants';

//import OutboundLink from '../Shared/OutboundLink';
//import EditIcon from '../Shared/Icons/EditIcon';
//import GotoIcon from '../Shared/Icons/GotoIcon';

export const PagesTableComponent = ({   pages,
                                        toggleEditModal,
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
/*        {
            Header: "status",
            accessor: 'status',
            filterMethod: (filter, row) => {
                if (filter.value === 'All') {
                    return true;
                }
                return row[filter.id] === filter.value;
            },
            Filter: ({ filter, onChange }) => (
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: '100%' }}
                    value={filter ? filter.value : 'All'}
                >
                    <option value="All">
                        {'pages.status_All'}
                    </option>
                    <option value="Draft">
                        {'pages.status_Draft'}
                    </option>
                    <option value="Published">
                        {'pages.status_Published'}
                    </option>
                    <option value="ScheduledToPublish">
                        {'pages.status_Scheduled'}
                    </option>
                    <option value="Unpublished">
                        {'pages.status_Unpublished'}
                    </option>
                    <option value="Deleted">
                        {'pages.status_Deleted'}
                    </option>
                    <option value="Stopped">
                        {'pages.status_Stopped'}
                    </option>
                </select>
            ),
            Cell: props => (
                <span title={props.value}>
          {'pages.status_' + props.value}
        </span>
            ),
        },
        {
            Header: "Author Email",
            accessor: 'author.email',
            //width: 100,
            Cell: props => ActionsComponent(props),
        },
        {
            Header: "productsSingleOrPlural",
            id: 'products',
            accessor: p => {
                let productNames = p.products.map(function(a) {
                    return a.productName;
                });
                return _.join(productNames, '; ');
            },
            Cell: props => <span title={props.value}>{props.value}</span>,
        },
        {
            Header: "createdBy",
            accessor: 'createdBy',
            Cell: props => <span title={props.value}>{props.value}</span>,
        },
        {
            Header: "lastModified",
            accessor: 'dateLastModified',
            filterable: false,
            Cell: props => (
                <span title={props.value}>
                  {props.value}
                </span>
            ),
        },
        {
            Header: "orchestration",
            accessor: 'crmShare',
            filterMethod: (filter, row) => {
                if (filter.value === 'All') {
                    return true;
                }
                return row[filter.id] === filter.value;
            },
            Filter: ({ filter, onChange }) => (
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: '100%' }}
                    value={filter ? filter.value : 'All'}
                >
                    <option value="All">
                        {'pages.crmShare_All'}
                    </option>
                    <option value="No">
                        {'pages.crmShare_No'}
                    </option>
                    <option value="Yes">
                        {'pages.crmShare_Yes'}
                    </option>
                    <option value="Triggerable">
                        {'pages.crmShare_Triggerable'}
                    </option>
                </select>
            ),
            Cell: props => (
                <span title={props.value}>
          {'pages.crmShare_' + props.value}
        </span>
            ),
        },*/
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
                childComponent: <div>X</div>,
                text: 'edit',
                onClick: () => toggleEditModal(row.original.id),
            },
        ];

        return <DataTableRowActions actions={actions}/>;
    };

    return (
        <DataTable
            data={pages.data}
            columns={columns}
            loading={pages.isLoading}
            onSortedChange={updateTableSorting}
        />
    );
};

PagesTableComponent.propTypes = {
    pages: PropTypes.object.isRequired,
    //table: PropTypes.object.isRequired,
};

export default PagesTableComponent;
