import React, { Component } from 'react';

import Modal from 'src/shared/components/old/common/Modal';
import Table from './Simple';
import ActionBar from './Bars/actionBar';
import SearchBar from './Bars/searchBar';

import { css } from 'src/styles/old';
import styles from './styles';

const ACTIONS = {
    delete: {
        text: 'Delete',
        fn: function deleteFn(table) {
            table.setState({
                modal: {
                    isOpen: true,
                    text: 'Delete Items?',
                    confirmText: 'Confirm Delete',
                    type: 'red',
                    confirmAction: table.props.deleteItems.bind(table, table.state.selection.ids),
                },
            });
        },
    },

    download: {
        text: 'Download Selected Info',
        fn: function downloadFn(table) {
            if (table.state.selection.all) {
                table.props.downloadItems();
            } else {
                table.props.downloadItems(table.state.selection.ids);
            }
        },
    },

    downloadall: {
        text: 'Download All Info',
        fn: function downloadAllFn(table) {
            table.props.downloadItems();
        },
    },
};

class FullTable extends Component {
    constructor(props) {
        super(props);

        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalConfirm = this.handleModalConfirm.bind(this);

        this.handleAction = this.handleAction.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.handleSelectionChange = this.handleSelectionChange.bind(this);

        this.state = {
            modal: {
                isOpen: false,
                text: '',
                confirmText: '',
                type: 'red',
                confirmAction: () => {},
            },
            selection: {
                all: false,
                ids: [],
            },
            searchFilter: '',
        };
    }

    handleModalClose() {
        this.setState({
            modal: {
                isOpen: false,
                confirmAction: () => {},
            },
        });
    }

    handleModalConfirm() {
        this.state.modal.confirmAction();
        this.handleModalClose();
    }

    handleAction(action) {
        this.props.actions[action].fn.call(null, this);
    }

    handleSearch(searchFilter) {
        this.setState({
            searchFilter,
        });
    }

    handleSelectionChange(selection) {
        this.setState({
            selection,
        });
    }

    render() {
        const {
            title,
            items,
            columns,
            totalItems,
            itemsPerPage,
            sortable,
            showSearchBar,
            fetchItems,
            actions,
        } = this.props;

        return (
            <div>
                <div className={css(styles.container, styles.containerUsers)}>
                    <Modal
                        isOpen={this.state.modal.isOpen}
                        text={this.state.modal.text}
                        confirmText={this.state.modal.confirmText}
                        type="red"
                        onClose={this.handleModalClose}
                        onConfirm={this.handleModalConfirm}
                        onCancel={this.handleModalClose}
                    />
                    {title && <h1 className={css(styles.title)}>{title}</h1>}
                    {!this.props.simple && (
                        <div className={css(styles.barContainer)}>
                            <div className={css(styles.actionBarContainer)}>
                                <ActionBar actions={actions} handleAction={this.handleAction} />
                            </div>
                            {showSearchBar && (
                                <div className={css(styles.searchBarContainer)}>
                                    <SearchBar handleSearch={this.handleSearch} />
                                </div>
                            )}
                        </div>
                    )}
                    <Table
                        items={items}
                        columns={columns}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        sortable={sortable}
                        filter={this.state.searchFilter}
                        fetch={fetchItems}
                        onSelectionChange={this.handleSelectionChange}
                        simple={this.props.simple}
                    />
                </div>
            </div>
        );
    }
}

FullTable.defaultProps = {
    title: '',
    itemsPerPage: 20, // [5, 10, 20, 25, 50, 100]
    sortable: true,
    showSearchBar: true,
    actions: ACTIONS,
    downloadItems: () => {},
    deleteItems: () => {},
};

export default FullTable;
