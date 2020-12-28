/* eslint-disable no-restricted-globals */

import React, { Component } from 'react';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import arrowDown from '../static/svg/down-arrow.svg';

import { css } from 'src/styles/old';
import styles from './styles';

class DropdownComp extends Component {
    state = {
        hasBeenSelected: false,
        isOpen: false,
    };

    componentWillReceiveProps({ values, value, onChange }) {
        const newItem = this.findItem(values, value);
        const item = this.findItem();

        if (!newItem && item) {
            onChange('');
        }
    }

    handleItemClick = (e, item) => {
        e.stopPropagation();
        const { onChange } = this.props;
        onChange(item);

        this.dropdown.hide();
    };

    findItem = (list, val) => {
        const values = list || this.props.values;
        const value = val || this.props.value;

        return values.find(v => v === value);
    };

    getTitle = () => {
        const { placeholder } = this.props;
        const item = this.findItem();

        if (!item) {
            return <span className={css(styles.placeholder)}>{placeholder}</span>;
        }

        return <span className={css(item.color && styles[`dropdown-${item.color}`])}>{item}</span>;
    };

    onShow = () => {
        this.setState({ isOpen: true });
    };

    onHide = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { isOpen } = this.state;
        const { label, tag } = this.props;

        return (
            <div className={css(styles.container)} data-test="dropdown">
                {label && (
                    <label className={css(styles.label)} htmlFor={name}>
                        {label}
                        {tag && <span className={css(styles.tag, styles.grayText)}>{` (${tag})`}</span>}
                    </label>
                )}
                <Dropdown
                    ref={ref => {
                        this.dropdown = ref;
                    }}
                    onShow={this.onShow}
                    onHide={this.onHide}
                    className={css(styles.input, styles.dropdown, isOpen && styles.activeInput)}
                >
                    <DropdownTrigger className={css(styles.dropdownTrigger)}>
                        <span>{this.getTitle()}</span>
                        <img src={arrowDown} alt="Select" />
                    </DropdownTrigger>
                    <DropdownContent className={css(styles.dropdownContent)}>
                        {this.props.values.map((val, i) =>
                            val.isHidden ? null : (
                                <div
                                    data-test="dropdownItem"
                                    className={`${css(styles.dropdownItem)} dropdown-item`}
                                    key={i.toString()}
                                    onClick={e => this.handleItemClick(e, val, i)}
                                >
                                    {val}
                                </div>
                            ),
                        )}
                    </DropdownContent>
                </Dropdown>
            </div>
        );
    }
}

DropdownComp.defaultProps = {
    label: '',
    values: [],
    defaultTitle: 'Select',
    placeholder: '',
    tag: '',
    meta: {},
    input: {},
};

export default DropdownComp;
